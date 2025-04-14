import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ reportId: string }>}
) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { reportId } = await params;
    const { status } = body;

    if (!status) {
      return new NextResponse("Missing status", { status: 400 });
    }

    const report = await prisma.report.update({
      where: {
        id: reportId,
      },
      data: {
        status,
      },
    });

    return NextResponse.json(report);
  } catch (error) {
    console.error("[REPORT_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 