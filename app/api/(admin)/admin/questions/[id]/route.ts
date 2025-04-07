import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { auth } from "@/auth";

// Schema for validation
const testCaseSchema = z.object({
  input: z.string().min(1, "Input is required"),
  output: z.string().min(1, "Output is required"),
  explanation: z.string().min(1, "Explanation is required"),
});

const sampleCodeSchema = z.object({
  language: z.enum(["javascript", "typescript", "python", "java", "cpp"]),
  code: z.string().min(10, "Sample code must be at least 10 characters"),
});

const questionUpdateSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  section: z.string().min(1, "Section is required"),
  topic: z.string().min(1, "Topic is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  difficulty: z.enum(["Easy", "Medium", "Hard"]),
  timeComplexity: z.string().min(1, "Time complexity is required"),
  spaceComplexity: z.string().min(1, "Space complexity is required"),
  testCases: z.array(testCaseSchema).min(1, "At least one test case is required"),
  constraints: z.array(z.string().min(1, "Constraint cannot be empty")).min(1, "At least one constraint is required"),
  sampleCodes: z.array(sampleCodeSchema).min(1, "At least one sample code is required"),
});

// GET handler to retrieve a specific question
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const question = await prisma.question.findUnique({
      where: {
        id: id,
      },
      include: {
        testCases: true,
        constraints: true,
        sampleCodes: true,
      },
    });

    if (!question) {
      return NextResponse.json(
        { message: "Question not found", success: false },
        { status: 404 }
      );
    }

    // Map database enum to frontend enum
    const difficultyMap: Record<string, "Easy" | "Medium" | "Hard"> = {
      "EASY": "Easy",
      "MEDIUM": "Medium",
      "HARD": "Hard",
    };

    // Map the database question to the frontend format
    const mappedQuestion = {
      id: question.id,
      title: question.title,
      description: question.description,
      difficulty: difficultyMap[question.difficulty],
      timeComplexity: question.timeComplexity,
      spaceComplexity: question.spaceComplexity,
      section: question.section,
      topic: question.topicName,
      testCases: question.testCases,
      constraints: question.constraints.map(c => c.value),
      sampleCodes: question.sampleCodes.map(sc => ({
        language: sc.language.toLowerCase(),
        code: sc.code
      })),
      createdAt: question.createdAt,
      updatedAt: question.updatedAt,
    };

    return NextResponse.json({
      message: "Question fetched successfully",
      data: mappedQuestion,
      success: true
    });
  } catch (error) {
    await prisma.errorLog.create({
      data: {
        errorAt: '[API] GET admin/questions/[id]/route.ts',
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    });   
    console.error("Error fetching question:", error);
    return NextResponse.json(
      { message: "Internal Server Error", data: error, success: false },
      { status: 500 }
    );
  }
}

// PUT handler to update a question
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Authorize the request
    const { id } = await params;        
    const session = await auth();
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Parse and validate the request body
    const body = await request.json();
    const validatedData = questionUpdateSchema.parse(body);

    // Convert difficulty to proper enum format
    const difficultyMap = {
      Easy: "EASY",
      Medium: "MEDIUM",
      Hard: "HARD",
    };

    // Convert language to proper enum format
    const languageMap = {
      javascript: "JAVASCRIPT",
      typescript: "TYPESCRIPT",
      python: "PYTHON",
      java: "JAVA",
      cpp: "CPP",
    };

    // Check if question exists
    const existingQuestion = await prisma.question.findUnique({
      where: {
        id: id,
      },
    });

    if (!existingQuestion) {
      return NextResponse.json(
        { message: "Question not found", success: false },
        { status: 404 }
      );
    }

    // Delete existing related records
    await prisma.$transaction([
      prisma.testCase.deleteMany({
        where: {
          questionId: id,
        },
      }),
      prisma.constraint.deleteMany({
        where: {
          questionId: id,
        },
      }),
      prisma.sampleCode.deleteMany({
        where: {
          questionId: id,
        },
      }),
    ]);

    // Update the question
    const updatedQuestion = await prisma.question.update({
      where: {
        id: id,
      },
      data: {
        title: validatedData.title,
        description: validatedData.description,
        difficulty: difficultyMap[validatedData.difficulty] as "EASY" | "MEDIUM" | "HARD",
        timeComplexity: validatedData.timeComplexity,
        spaceComplexity: validatedData.spaceComplexity,
        section: validatedData.section,
        topicName: validatedData.topic,
        // Create test cases
        testCases: {
          create: validatedData.testCases.map(testCase => ({
            input: testCase.input,
            output: testCase.output,
            explanation: testCase.explanation,
          })),
        },
        // Create constraints
        constraints: {
          create: validatedData.constraints.map(constraint => ({
            value: constraint,
          })),
        },
        // Create sample codes
        sampleCodes: {
          create: validatedData.sampleCodes.map(sampleCode => ({
            language: languageMap[sampleCode.language] as "JAVASCRIPT" | "TYPESCRIPT" | "PYTHON" | "JAVA" | "CPP",
            code: sampleCode.code,
          })),
        },
      },
    });

    return NextResponse.json({
      message: "Question updated successfully",
      data: updatedQuestion,
      success: true
    });
  } catch (error) {
    await prisma.errorLog.create({
      data: {
        errorAt: '[API] PUT admin/questions/[id]/route.ts',
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    });
    console.error("Error updating question:", error);

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

// DELETE handler to delete a question
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Authorize the request
    const { id } = await params;
    const session = await auth();
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Check if question exists
    const existingQuestion = await prisma.question.findUnique({
      where: {
        id: id,
      },
    });

    if (!existingQuestion) {
      return NextResponse.json(
        { message: "Question not found", success: false },
        { status: 404 }
      );
    }

    // Delete the question (related records will be deleted automatically due to cascading delete)
    await prisma.question.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json({
      message: "Question deleted successfully",
      success: true
    });
  } catch (error) {
    console.error("Error deleting question:", error);
    await prisma.errorLog.create({
      data: {
        errorAt: '[API] DELETE admin/questions/[id]/route.ts',
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    });
    return NextResponse.json(
      { message: "Internal Server Error", data: error, success: false },
      { status: 500 }
    );
  }
} 