import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { type, title, description, platform, requestedUsername } = body;

    if (!type || !title || !description) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    let newDescription = description;
    if (type === "USERNAME_CHANGE") {
      if (!platform || !requestedUsername) {
        return new NextResponse("Missing required fields", { status: 400 });
      }
      newDescription = `Platform: ${platform}\nRequested Username: ${requestedUsername}\n${description}`;
    }


    const report = await prisma.report.create({
      data: {
        userId: session.user.id,
        type,
        title,
        description: newDescription,
      },
    });

    return NextResponse.json(report);
  } catch (error) {
    console.error("[REPORTS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");
    const status = searchParams.get("status");

    const reports = await prisma.report.findMany({
      where: {
        userId: session.user.id,
        ...(type && { type: type as any }),
        ...(status && { status: status as any }),
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(reports);
  } catch (error) {
    console.error("[REPORTS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 