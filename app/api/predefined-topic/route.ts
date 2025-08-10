import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {

    try {
        const subjects = await prisma.subject.findMany({
            where: {
                canHaveRoadmap: true
            }, include: {
                sections: {
                    select: {
                        id: true
                    }
                }
            }
        })
        const sectionIds = subjects
  .flatMap(subject => subject.sections.map(section => section.id));
        const topics = await prisma.predefinedTopic.findMany({
            where: {
                predefinedSectionId : {
                    in: sectionIds
                }
            },
            include: {
                resources: true,
                predefinedSection: {
                    include: {
                        subject: true
                    }
                },
                questions: true,
            },
        });
        return NextResponse.json({ message: "Topics fetched successfully", data: topics, success: true });
    } catch (error) {
        console.error("Error fetching topics:", error);
        return NextResponse.json({ message: "Internal Server Error", data: [], success: false }, { status: 500 });
    }
}