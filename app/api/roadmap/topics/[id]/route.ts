import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ message: "Unauthorized", success: false }, { status: 401 });
        }

        const topicId = (await params).id;

        // Get topic with all related data
        const topic = await prisma.topic.findUnique({
            where: {
                id: topicId,
            },
            include: {
                predefinedTopic: {
                    include: {
                        resources: true,
                        predefinedSection: true,
                        questions: {
                            include: {
                                solvedBy: {
                                    where: {
                                        userId: session.user.id
                                    }
                                }
                            }
                        }
                    },
                },
                // questions: {
                //     include: {
                //         solvedBy: {
                //             where: {
                //                 userId: session.user.id
                //             }
                //         }
                //     }
                // }
            },
        });

        if (!topic) {
            return NextResponse.json({ message: "Topic not found", success: false }, { status: 404 });
        }

        // Calculate progress stats
        const totalProblems = topic.predefinedTopic.questions.length;
        const solvedProblems = topic.predefinedTopic.questions.filter(q => q.solvedBy.length > 0).length;
        const completion = totalProblems > 0 ? Math.round((solvedProblems / totalProblems) * 100) : 0;

        // Format the response
        const formattedTopic = {
            id: topic.id,
            title: topic.predefinedTopic.title,
            description: topic.predefinedTopic.description || "",
            resources: topic.predefinedTopic.resources.map(resource => ({
                id: resource.id,
                title: resource.title,
                url: resource.url,
                type: resource.type
            })),
            problems: topic.predefinedTopic.questions.map(question => ({
                id: question.id,
                title: question.title,
                difficulty: question.difficulty,
                description: question.description,
                platform: "LeetCode", // This could be made dynamic based on the question source
                completion: question.solvedBy.length > 0 ? 100 : 0
            })),
            subtopics: topic.predefinedTopic.subTopics,
            prerequisites: topic.predefinedTopic.preRequisites,
            progressStats: {
                completion,
                problemsSolved: solvedProblems,
                totalProblems,
                timeSpent: "0h 0m" // This could be calculated from user's activity logs
            }
        };

        return NextResponse.json({ message: "Topic fetched successfully", data: formattedTopic, success: true });
    } catch (error) {
        console.error("Error fetching topic:", error);
        return NextResponse.json({ message: "Internal Server Error", success: false }, { status: 500 });
    }
} 