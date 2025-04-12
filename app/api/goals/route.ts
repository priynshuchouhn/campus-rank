import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET() {
    try {
        const session = await auth();
        if (!session?.user?.email) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
            include: { weeklyGoals: {
                where: {
                    isDeleted: false
                }
            } }
        });

        if (!user) {
            return new NextResponse("User not found", { status: 404 });
        }

        return NextResponse.json(user.weeklyGoals);
    } catch (error) {
        console.error("[GOALS_GET]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await auth();
        if (!session?.user?.email) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        const { title, description, targetCount, startDate, endDate, type } = body;

        if (!title || !targetCount || !startDate || !endDate || !type) {
            return new NextResponse("Missing required fields", { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email }
        });

        if (!user) {
            return new NextResponse("User not found", { status: 404 });
        }

        const goal = await prisma.weeklyGoal.create({
            data: {
                title,
                description,
                targetCount,
                currentCount: 0,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                type,
                userId: user.id
            }
        });

        return NextResponse.json(goal);
    } catch (error) {
        console.error("[GOALS_POST]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function PATCH(req: Request) {
    try {
        const session = await auth();
        if (!session?.user?.email) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        const { id, currentCount, status } = body;

        if (!id) {
            return new NextResponse("Missing goal ID", { status: 400 });
        }

        const goal = await prisma.weeklyGoal.update({
            where: { id },
            data: {
                ...(currentCount !== undefined && { currentCount }),
                ...(status && { status })
            }
        });

        return NextResponse.json(goal);
    } catch (error) {
        console.error("[GOALS_PATCH]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const session = await auth();
        if (!session?.user?.email) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return new NextResponse("Missing goal ID", { status: 400 });
        }

        await prisma.weeklyGoal.update({
            where: { id },
            data: {
                isDeleted: true
            }
        });

        return new NextResponse(null, { status: 204 });
    } catch (error) {
        console.error("[GOALS_DELETE]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
} 