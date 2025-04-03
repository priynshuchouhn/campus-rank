import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { auth } from "@/auth";

// Schema for validation
const sectionSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

// GET a single predefined section
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const sectionId = (await params).id;
    const session = await auth();
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ message: "Unauthorized", success: false }, { status: 401 });
    }
    
    // Get predefined section
    const section = await prisma.predefinedSection.findUnique({
      where: {
        id: sectionId,
      },
      include: {
        topics: true,
      },
    });
    
    if (!section) {
      return NextResponse.json(
        { message: "Predefined section not found", success: false },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      message: "Predefined section fetched successfully",
      data: {
        id: section.id,
        name: section.title,
        description: section.description || "",
        topicsCount: section.topics.length,
        topics: section.topics.map(topic => ({
          id: topic.id,
          name: topic.title,
          description: topic.description || "",
        })),
      },
      success: true,
    });
  } catch (error) {
    console.error("Error fetching section:", error);
    return NextResponse.json(
      { message: "Internal Server Error", data: error, success: false },
      { status: 500 }
    );
  }
}

// Update a predefined section
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const sectionId = (await params).id;
    const session = await auth();
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ message: "Unauthorized", success: false }, { status: 401 });
    }

    // Check if predefined section exists
    const existingSection = await prisma.predefinedSection.findUnique({
      where: {
        id: sectionId,
      },
    });
    
    if (!existingSection) {
      return NextResponse.json(
        { message: "Predefined section not found", success: false },
        { status: 404 }
      );
    }
    
    // Parse and validate the request body
    const body = await request.json();
    const validatedData = sectionSchema.parse(body);
    
    // Update the predefined section
    const updatedSection = await prisma.predefinedSection.update({
      where: {
        id: sectionId,
      },
      data: {
        title: validatedData.name,
        description: validatedData.description,
      },
      include: {
        topics: true,
      },
    });
    
    return NextResponse.json({
      message: "Predefined section updated successfully",
      data: {
        id: updatedSection.id,
        name: updatedSection.title,
        description: updatedSection.description || "",
        topicsCount: updatedSection.topics.length,
      },
      success: true,
    });
  } catch (error) {
    console.error("Error updating section:", error);
    
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

// Delete a predefined section
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const sectionId = (await params).id;
    const session = await auth();
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ message: "Unauthorized", success: false }, { status: 401 });
    }
      
    // Check if predefined section exists
    const existingSection = await prisma.predefinedSection.findUnique({
      where: {
        id: sectionId,
      },
    });
    
    if (!existingSection) {
      return NextResponse.json(
        { message: "Predefined section not found", success: false },
        { status: 404 }
      );
    }
    
    // Delete the predefined section
    await prisma.predefinedSection.delete({
      where: {
        id: sectionId,
      },
    });
    
    return NextResponse.json({
      message: "Predefined section deleted successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error deleting section:", error);
    return NextResponse.json(
      { message: "Internal Server Error", data: error, success: false },
      { status: 500 }
    );
  }
} 