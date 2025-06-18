import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { auth } from "@/auth";

// Schema for validation
const sectionSchema = z.object({
  subjectName: z.string().min(2, "Name must be at least 2 characters"),
  isCoreSubject: z.boolean(),
});

// GET predefined subjects
export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ message: "Unauthorized", success: false }, { status: 401 });
    }
    // Get predefined subjects with topic counts
    const subjects = await prisma.subject.findMany({
      // orderBy: {
      //   createdAt: 'asc',
      // },
    });

    return NextResponse.json({ message: "Subjects fetched successfully", data: subjects, success: true });
  } catch (error) {
    console.error("Error fetching subjects:", error);
    await prisma.errorLog.create({
      data: {
        errorAt: '[API] GET admin/subjects/route.ts',
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    });
    return NextResponse.json(
      { message: "Internal Server Error", data: error, success: false },
      { status: 500 }
    );
  }
}

// Create a new predefined subject
export async function POST(request: NextRequest) {
  try {
    // Parse and validate the request body
    const body = await request.json();
    const validatedData = sectionSchema.parse(body);
    const session = await auth();
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ message: "Unauthorized", success: false }, { status: 401 });
    }
    
    // Create a predefined subject
    const subject = await prisma.subject.create({
      data: {
        subjectName: validatedData.subjectName,
        isCoreSubject: validatedData.isCoreSubject,
      },
    });
    
    return NextResponse.json(
      { 
        message: "Predefined subject created successfully",
        data: {
          id: subject.id,
          subjectName: subject.subjectName,
          isCoreSubject: subject.isCoreSubject,
        },
        success: true,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating subject:", error);
    await prisma.errorLog.create({
      data: {
        errorAt: '[API] POST admin/subjects/route.ts',
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    });
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Validation error", data: error.errors, success: false },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { message: "Internal Server Error", data: error, success: false },
      { status: 500 }
    );
  }
} 