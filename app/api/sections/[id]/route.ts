import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

// Schema for validation
const sectionSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

// GET a single predefined section
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const sectionId = params.id;
    
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
        { message: "Predefined section not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      section: {
        id: section.id,
        name: section.title,
        description: section.description || "",
        topicsCount: section.topics.length,
        topics: section.topics.map(topic => ({
          id: topic.id,
          name: topic.title,
          description: topic.description || "",
        })),
      }
    });
  } catch (error) {
    console.error("Error fetching section:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Update a predefined section
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const sectionId = params.id;
    
    // Check if predefined section exists
    const existingSection = await prisma.predefinedSection.findUnique({
      where: {
        id: sectionId,
      },
    });
    
    if (!existingSection) {
      return NextResponse.json(
        { message: "Predefined section not found" },
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
      section: {
        id: updatedSection.id,
        name: updatedSection.title,
        description: updatedSection.description || "",
        topicsCount: updatedSection.topics.length,
      },
    });
  } catch (error) {
    console.error("Error updating section:", error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Validation error", errors: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Delete a predefined section
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const sectionId = params.id;
    
    // Check if predefined section exists
    const existingSection = await prisma.predefinedSection.findUnique({
      where: {
        id: sectionId,
      },
    });
    
    if (!existingSection) {
      return NextResponse.json(
        { message: "Predefined section not found" },
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
    });
  } catch (error) {
    console.error("Error deleting section:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
} 