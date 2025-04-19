import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";
import { auth } from "@/auth";
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.role || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { subject, content, targetAudience } = await req.json();

    if (!subject || !content) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // Get users based on target audience
    let users;
    switch (targetAudience) {
      case "active":
        users = await prisma.user.findMany({
          where: {
            lastLogin: {
              gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Last 30 days
            },
          },
        });
        break;
      case "inactive":
        users = await prisma.user.findMany({
          where: {
            lastLogin: {
              lt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // More than 30 days ago
            },
          },
        });
        break;
      default:
        users = await prisma.user.findMany(
          {
            where: {username: "priynshuchouhn"}
          }
        );
    }

    // Send emails to all selected users
    const emailPromises = users.map((user) =>
      resend.emails.send({
        from: "Campus Rank <priynshu@campusrank.org>",
        to: user.email,
        subject,
        html: content,
      })
    );

    const data = await Promise.all(emailPromises);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[SEND_PROMOTIONAL_EMAIL]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 