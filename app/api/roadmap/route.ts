import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

// GET roadmap for current user
export async function GET(request: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ message: "Unauthorized", success: false }, { status: 401 });
        }

        // Get user's roadmap
        const roadmap = await prisma.roadmap.findUnique({
            where: {
                userId: session.user.id,
            },
            include: {
                sections: {
                    include: {
                        topics: {
                            include: {
                                predefinedTopic: {
                                    include: {
                                        resources: true,
                                        predefinedSection: true,
                                    },
                                },
                            },
                        },
                    },
                    orderBy: {
                        order: 'asc',
                    },
                },
            },
        });

        if (!roadmap) {
            return NextResponse.json({ message: "No roadmap found", data: null, success: true });
        }

        return NextResponse.json({ message: "Roadmap fetched successfully", data: roadmap, success: true });
    } catch (error) {
        console.error("Error fetching roadmap:", error);
        return NextResponse.json({ message: "Internal Server Error", success: false }, { status: 500 });
    }
}

// Create or update roadmap
export async function POST(request: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ message: "Unauthorized", success: false }, { status: 401 });
        }

        const body = await request.json();
        const { level, strongTopics, weakTopics } = body;

        // Get predefined topics based on assessment
        const predefinedTopics = await prisma.predefinedTopic.findMany({
            where: {
                OR: [
                    { id: { in: strongTopics } },
                    { id: { in: weakTopics } },
                ],
            },
            include: {
                predefinedSection: true,
                resources: true,
            },
        });

        // Group topics by section
        const topicsBySection = predefinedTopics.reduce((acc, topic) => {
            const sectionId = topic.predefinedSectionId;
            if (!acc[sectionId]) {
                acc[sectionId] = {
                    section: topic.predefinedSection,
                    topics: [],
                };
            }
            acc[sectionId].topics.push(topic);
            return acc;
        }, {} as Record<string, { section: any; topics: any[] }>);

        // Create or update roadmap
        const roadmap = await prisma.$transaction(async (tx) => {
            // Delete existing roadmap if exists
            await tx.roadmap.deleteMany({
                where: {
                    userId: session.user.id,
                },
            });

            // Create new roadmap
            const newRoadmap = await tx.roadmap.create({
                data: {
                    userId: session.user.id,
                },
            });

            // Create sections and topics in batches
            const sectionPromises = Object.entries(topicsBySection).map(async ([sectionId, data], index) => {
                const section = await tx.section.create({
                    data: {
                        title: data.section.title,
                        order: index,
                        predefinedSectionId: sectionId,
                        roadmapId: newRoadmap.id,
                    },
                });

                // Create topics for this section in batches
                const topicPromises = data.topics.map((topic, topicIndex) =>
                    tx.topic.create({
                        data: {
                            order: topicIndex,
                            predefinedTopicId: topic.id,
                            sectionId: section.id,
                            roadmapId: newRoadmap.id,
                        },
                    })
                );

                await Promise.all(topicPromises);
                return section;
            });

            await Promise.all(sectionPromises);

            // Get the complete roadmap with all relations
            return await tx.roadmap.findUnique({
                where: { id: newRoadmap.id },
                include: {
                    sections: {
                        include: {
                            topics: {
                                include: {
                                    predefinedTopic: {
                                        include: {
                                            resources: true,
                                            predefinedSection: true,
                                        },
                                    },
                                },
                            },
                        },
                        orderBy: {
                            order: 'asc',
                        },
                    },
                },
            });
        }, {
            timeout: 60000, // Increase timeout to 30 seconds
            maxWait: 60000, // Maximum time to wait for the transaction
            isolationLevel: 'Serializable' // Use serializable isolation level for consistency
        });

        return NextResponse.json({ message: "Roadmap created successfully", data: roadmap, success: true }, { status: 201 });
    } catch (error) {
        console.error("Error creating roadmap:", error);
        if (error instanceof Error) {
            return NextResponse.json({ 
                message: "Failed to create roadmap", 
                error: error.message,
                success: false 
            }, { status: 500 });
        }
        return NextResponse.json({ 
            message: "Internal Server Error", 
            success: false 
        }, { status: 500 });
    }
} 