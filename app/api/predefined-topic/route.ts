import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
    try {
        const topics = await prisma.predefinedTopic.findMany({
            include: {
                resources: true,
                predefinedSection: true,
                questions: true,
            },
        });
        return NextResponse.json({ message: "Topics fetched successfully", data: topics, success: true });
    } catch (error) {
        console.error("Error fetching topics:", error);
        return NextResponse.json({ message: "Internal Server Error", data: [], success: false }, { status: 500 });
    }
}