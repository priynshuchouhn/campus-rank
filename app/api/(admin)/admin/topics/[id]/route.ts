import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { auth } from "@/auth";

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

// GET a single topic by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const topicId = (await params).id;
    const session = await auth();
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ message: "Unauthorized" , data: [] , success: false}, { status: 401 });
    } 
    
    // Get topic with resources and section info
    const topic = await prisma.predefinedTopic.findUnique({
      where: {
        id: topicId,
      },
      include: {
        resources: true,
        predefinedSection: true,
      },
    });
    
    if (!topic) {
      return NextResponse.json(
        { message: "Topic not found" },
        { status: 404 }
      );
    }
    
    // Format for frontend
    const formattedTopic = {
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
    };
    
    return NextResponse.json({ message: "Topic fetched successfully", data: formattedTopic , success: true });
  } catch (error) {
    console.error("Error fetching topic:", error);
    await prisma.errorLog.create({
      data: {
        errorAt: '[API] GET admin/topics/[id]/route.ts',
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    });
    return NextResponse.json(
      { message: "Internal Server Error" , data: [] , success: false },
      { status: 500 }
    );
  }
}

// Update a topic by ID
export async function PUT(
  request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
  try {
    const topicId = (await params).id;
    const session = await auth();
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ message: "Unauthorized" , data: [] , success: false}, { status: 401 });
    }  
    // Check if topic exists
    const existingTopic = await prisma.predefinedTopic.findUnique({
      where: {
        id: topicId,
      },
      include: {
        resources: true,
      },
    });
    
    if (!existingTopic) {
      return NextResponse.json(
        { message: "Topic not found" },
        { status: 404 }
      );
    }
    
    // Parse and validate the request body
    const body = await request.json();
    const validatedData = topicSchema.parse(body);
    
    // Update topic and resources in a transaction
    const result = await prisma.$transaction(async (tx) => {
      // Update the topic
      const updatedTopic = await tx.predefinedTopic.update({
        where: {
          id: topicId,
        },
        data: {
          title: validatedData.title,
          description: validatedData.description,
          predefinedSectionId: validatedData.sectionId,
        },
      });
      
      // Delete existing resources for this topic
      await tx.resource.deleteMany({
        where: {
          topicId,
        },
      });
      
      // Create new resources if provided
      if (validatedData.resources && validatedData.resources.length > 0) {
        await Promise.all(
          validatedData.resources.map(resource => 
            tx.resource.create({
              data: {
                title: resource.title,
                url: resource.url,
                type: resource.type,
                topicId,
              }
            })
          )
        );
      }
      
      // Get the complete updated topic with resources
      return await tx.predefinedTopic.findUnique({
        where: { id: topicId },
        include: {
          resources: true,
          predefinedSection: true,
        }
      });
    });
    
    if (!result) {
      throw new Error("Failed to update topic");
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
    
    return NextResponse.json({
      message: "Topic updated successfully",
      data: formattedTopic,
      success: true
    });
  } catch (error) {
    console.error("Error updating topic:", error);
    await prisma.errorLog.create({
      data: {
        errorAt: '[API] PUT admin/topics/[id]/route.ts',
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    });
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Validation error", errors: error.errors , data: [] , success: false },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { message: "Internal Server Error" , data: [] , success: false },
      { status: 500 }
    );
  }
}

// Delete a topic by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const topicId = (await params).id;
    const session = await auth();
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ message: "Unauthorized" , data: [] , success: false}, { status: 401 });
    } 
    // Check if topic exists
    const existingTopic = await prisma.predefinedTopic.findUnique({
      where: {
        id: topicId,
      },
    });
    
    if (!existingTopic) {
      return NextResponse.json(
        { message: "Topic not found" },
        { status: 404 }
      );
    }
    
    // Delete topic and related resources in a transaction
    await prisma.$transaction(async (tx) => {
      // Delete related resources
      await tx.resource.deleteMany({
        where: {
          topicId,
        },
      });
      
      // Delete the topic
      await tx.predefinedTopic.delete({
        where: {
          id: topicId,
        },
      });
    });
    
    return NextResponse.json({
      message: "Topic deleted successfully",
      data: [],
      success: true
    });
  } catch (error) {
    console.error("Error deleting topic:", error);
    await prisma.errorLog.create({
      data: {
        errorAt: '[API] DELETE admin/topics/[id]/route.ts',
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    });
    return NextResponse.json(
      { message: "Internal Server Error" , data: [] , success: false  },
      { status: 500 }
    );
  }
} 