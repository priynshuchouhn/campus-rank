import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { auth } from "@/auth";

// Schema for validation
const subjectSchema = z.object({
  subjectName: z.string().min(2, "Name must be at least 2 characters"),
  isCoreSubject: z.boolean(),
});

// GET a single predefined subject
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const subjectId = (await params).id;
    const session = await auth();
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ message: "Unauthorized", success: false }, { status: 401 });
    }
    
    // Get predefined subject
    const subject = await prisma.subject.findUnique({
      where: {
        id: subjectId,
      },
    });
    
    if (!subject) {
      return NextResponse.json(
        { message: "Predefined subject not found", success: false },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      message: "Predefined subject fetched successfully",
      data: {
        id: subject.id,
        name: subject.subjectName,
        description: subject.isCoreSubject,
      },
      success: true,
    });
  } catch (error) {
    console.error("Error fetching subject:", error);
    await prisma.errorLog.create({
      data: {
        errorAt: '[API] GET admin/subjects/[id]/route.ts',
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    });
    return NextResponse.json(
      { message: "Internal Server Error", data: error, success: false },
      { status: 500 }
    );
  }
}

// Update a predefined subject
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const subjectId = (await params).id;
    const session = await auth();
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ message: "Unauthorized", success: false }, { status: 401 });
    }

    // Check if predefined subject exists
    const existingSection = await prisma.subject.findUnique({
      where: {
        id: subjectId,
      },
    });
    
    if (!existingSection) {
      return NextResponse.json(
        { message: "Predefined subject not found", success: false },
        { status: 404 }
      );
    }
    
    // Parse and validate the request body
    const body = await request.json();
    const validatedData = subjectSchema.parse(body);
    
    // Update the predefined subject
    const updatedSection = await prisma.subject.update({
      where: {
        id: subjectId,
      },
      data: {
        subjectName: validatedData.subjectName,
        isCoreSubject: validatedData.isCoreSubject,
      },
    });
    
    return NextResponse.json({
      message: "Predefined subject updated successfully",
      data: {
        id: updatedSection.id,
        subjectName: updatedSection.subjectName,
        isCoreSubject: updatedSection.isCoreSubject,
      },
      success: true,
    });
  } catch (error) {
    console.error("Error updating subject:", error);
    await prisma.errorLog.create({
      data: {
        errorAt: '[API] PUT admin/subjects/[id]/route.ts',
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

// Delete a predefined subject
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const subjectId = (await params).id;
    const session = await auth();
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ message: "Unauthorized", success: false }, { status: 401 });
    }
      
    // Check if predefined subject exists
    const existingSection = await prisma.subject.findUnique({
      where: {
        id: subjectId,
      },
    });
    
    if (!existingSection) {
      return NextResponse.json(
        { message: "Predefined subject not found", success: false },
        { status: 404 }
      );
    }
    
    // Delete the predefined subject
    await prisma.subject.delete({
      where: {
        id: subjectId,
      },
    });
    
    return NextResponse.json({
      message: "Predefined subject deleted successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error deleting subject:", error);
    await prisma.errorLog.create({
      data: {
        errorAt: '[API] DELETE admin/subjects/[id]/route.ts',
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    });
    return NextResponse.json(
      { message: "Internal Server Error", data: error, success: false },
      { status: 500 }
    );
  }
} 