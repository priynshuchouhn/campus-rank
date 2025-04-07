import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { auth } from "@/auth";

// Schema for validation
const sectionSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  isPredefined: z.boolean().optional().default(true) // Always predefined in admin
});

// GET predefined sections
export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ message: "Unauthorized", success: false }, { status: 401 });
    }
    // Get predefined sections with topic counts
    const predefinedSections = await prisma.predefinedSection.findMany({
      include: {
        topics: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    // Map to frontend format
    const formattedSections = predefinedSections.map(section => ({
      id: section.id,
      name: section.title,
      description: section.description || "",
      topicsCount: section.topics.length,
      topics: section.topics.map(topic => ({
        id: topic.id,
        title: topic.title,
        description: topic.description,
        sectionId: topic.predefinedSectionId,
      })),
    }));

    return NextResponse.json({ message: "Sections fetched successfully", data: formattedSections, success: true });
  } catch (error) {
    console.error("Error fetching sections:", error);
    await prisma.errorLog.create({
      data: {
        errorAt: '[API] GET admin/sections/route.ts',
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    });
    return NextResponse.json(
      { message: "Internal Server Error", data: error, success: false },
      { status: 500 }
    );
  }
}

// Create a new predefined section
export async function POST(request: NextRequest) {
  try {
    // Parse and validate the request body
    const body = await request.json();
    const validatedData = sectionSchema.parse(body);
    const session = await auth();
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ message: "Unauthorized", success: false }, { status: 401 });
    }
    
    // Create a predefined section
    const section = await prisma.predefinedSection.create({
      data: {
        title: validatedData.name,
        description: validatedData.description,
      },
    });
    
    return NextResponse.json(
      { 
        message: "Predefined section created successfully",
        data: {
          id: section.id,
          name: section.title,
          description: section.description || "",
          topicsCount: 0,
        },
        success: true,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating section:", error);
    await prisma.errorLog.create({
      data: {
        errorAt: '[API] POST admin/sections/route.ts',
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