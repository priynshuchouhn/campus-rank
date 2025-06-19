import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET(request: NextRequest) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ message: "Unauthorized", success: false }, { status: 401 });
    }
    const topics = await prisma.topic.findMany({
        where: {
            roadmap: {
                userId: session.user.id,
            },
        },
        include: {
            predefinedTopic: {
                include: {
                    resources: true,
                    predefinedSection: true,
                    questions: true,
                },
            },
            section: true,
            roadmap: true,

        },
    });
    return NextResponse.json({ data: topics, success: true, message: "Topics fetched successfully" });
}