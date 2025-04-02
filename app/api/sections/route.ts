import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

// Schema for validation
const sectionSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  isPredefined: z.boolean().optional().default(true) // Always predefined in admin
});

// GET predefined sections
export async function GET(request: NextRequest) {
  try {
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
    }));

    return NextResponse.json({ sections: formattedSections });
  } catch (error) {
    console.error("Error fetching sections:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
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
        section: {
          id: section.id,
          name: section.title,
          description: section.description || "",
          topicsCount: 0,
        }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating section:", error);
    
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