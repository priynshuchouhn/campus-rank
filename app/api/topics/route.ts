import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

// Schema for resource validation
const resourceSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  url: z.string().url("Must be a valid URL"),
  type: z.enum(["VIDEO", "ARTICLE"])
});

// Schema for topic validation
const topicSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  sectionId: z.string().min(1, "Section is required"),
  resources: z.array(resourceSchema).optional().default([])
});

// GET topics - optionally filtered by sectionId
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sectionId = searchParams.get('sectionId');
    
    // Base query
    const whereClause = sectionId ? { predefinedSectionId: sectionId } : {};
    
    // Get topics with resources and section info
    const topics = await prisma.predefinedTopic.findMany({
      where: whereClause,
      include: {
        resources: true,
        predefinedSection: true
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Format for frontend
    const formattedTopics = topics.map(topic => ({
      id: topic.id,
      title: topic.title,
      description: topic.description || "",
      sectionId: topic.predefinedSectionId,
      sectionName: topic.predefinedSection.title,
      resources: topic.resources.map(resource => ({
        id: resource.id,
        title: resource.title,
        url: resource.url,
        type: resource.type
      }))
    }));

    return NextResponse.json({ topics: formattedTopics });
  } catch (error) {
    console.error("Error fetching topics:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Create a new topic with optional resources
export async function POST(request: NextRequest) {
  try {
    // Parse and validate the request body
    const body = await request.json();
    const validatedData = topicSchema.parse(body);
    
    // Create the topic with nested resources in a transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create the topic
      const topic = await tx.predefinedTopic.create({
        data: {
          title: validatedData.title,
          description: validatedData.description,
          predefinedSectionId: validatedData.sectionId,
        },
      });
      
      // Create resources if provided
      if (validatedData.resources && validatedData.resources.length > 0) {
        await Promise.all(
          validatedData.resources.map(resource => 
            tx.resource.create({
              data: {
                title: resource.title,
                url: resource.url,
                type: resource.type,
                topicId: topic.id
              }
            })
          )
        );
      }
      
      // Get the complete topic with resources
      return await tx.predefinedTopic.findUnique({
        where: { id: topic.id },
        include: {
          resources: true,
          predefinedSection: true
        }
      });
    });
    
    if (!result) {
      throw new Error("Failed to create topic");
    }
    
    // Format for response
    const formattedTopic = {
      id: result.id,
      title: result.title,
      description: result.description || "",
      sectionId: result.predefinedSectionId,
      sectionName: result.predefinedSection.title,
      resources: result.resources.map(resource => ({
        id: resource.id,
        title: resource.title,
        url: resource.url,
        type: resource.type
      }))
    };
    
    return NextResponse.json(
      { 
        message: "Topic created successfully",
        topic: formattedTopic
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating topic:", error);
    
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