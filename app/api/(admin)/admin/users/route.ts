import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user || session.user.role !== "ADMIN") {
            return NextResponse.json({ message: "Unauthorized", success: false }, { status: 401 });
        }

        const users = await prisma.user.findMany({
            where: {
                role: "USER",
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        return NextResponse.json({ message: "Users fetched successfully", data: users, success: true });
    } catch (error) {
        await prisma.errorLog.create({
            data: {
                errorAt: '[API] GET admin/users/route.ts',
                error: error instanceof Error ? error.message : 'Unknown error',
            }
        });
        return NextResponse.json({ message: "Error fetching users", error: error, success: false }, { status: 500 });
    }
}
