import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const session = await auth();
        console.log(session);
        if (!session?.user || session.user.role !== "ADMIN") {
            return NextResponse.json(
                { message: "Unauthorized", success: false },
                { status: 401 }
            );
        }
        // Get search params
        const { searchParams } = new URL(request.url);
        const page = Number(searchParams.get("page") ?? "1");
        const pageSize = Number(searchParams.get("pageSize") ?? "10");

        const skip = (page - 1) * pageSize;

        // Fetch users with pagination
        const [users, total] = await Promise.all([
            prisma.user.findMany({
                where: {
                    role: "USER",
                },
                orderBy: {
                    createdAt: "desc",
                },
                skip,
                take: pageSize,
            }),
            prisma.user.count({
                where: { role: "USER" },
            }),
        ]);

        return NextResponse.json({
            message: "Users fetched successfully",
            data: {
                users,
                pagination: {
                    total,
                    page,
                    pageSize,
                    pageCount: Math.ceil(total / pageSize),
                }
            },

            success: true,
        });
    } catch (error) {
        await prisma.errorLog.create({
            data: {
                errorAt: "[API] GET admin/users/route.ts",
                error: error instanceof Error ? error.message : "Unknown error",
            },
        });
        return NextResponse.json(
            {
                message: "Error fetching users",
                error: error instanceof Error ? error.message : "Unknown error",
                success: false,
            },
            { status: 500 }
        );
    }
}
