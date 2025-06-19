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

const questionSchema = z.object({
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

// GET handler to retrieve all questions
export async function GET() {
  try {
    // Try a simpler query first
    const session = await auth();
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    // If count works, then try a simple findMany without includes
    const simpleQuestions = await prisma.question.findMany({
      select: {
        id: true,
        title: true,
        difficulty: true,
        createdAt: true,
        updatedAt: true,
        testCases: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    
    // Map the database questions to the frontend format
    const mappedQuestions = simpleQuestions.map(question => {
      // Map database enum to frontend enum
      const difficultyMap: Record<string, "Easy" | "Medium" | "Hard"> = {
        "EASY": "Easy",
        "MEDIUM": "Medium",
        "HARD": "Hard",
      };
      
      return {
        id: question.id,
        title: question.title,
        difficulty: difficultyMap[question.difficulty],
        testCases: question.testCases,
        constraints: [],
        sampleCodes: [],
        createdAt: question.createdAt,
        updatedAt: question.updatedAt,
        // Add required fields for the interface
        description: '',
        timeComplexity: '',
        spaceComplexity: '',
      };
    });
    
    return NextResponse.json({ 
      message: "Questions fetched successfully",
      data: mappedQuestions,
      success: true
    });
  } catch (error) {
    console.error("Error fetching questions:", error);
    await prisma.errorLog.create({
      data: {
        errorAt: '[API] GET admin/questions/route.ts',
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    });
    return NextResponse.json(
      { message: "Internal Server Error", data: error, success: false },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    
    
    // Parse and validate the request body
    const body = await request.json();
    const validatedData = questionSchema.parse(body);
    const session = await auth();
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    
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
    
    // Create the question in the database
    const question = await prisma.question.create({
      data: {
        title: validatedData.title,
        description: validatedData.description,
        questionType: 'CODE',
        difficulty: difficultyMap[validatedData.difficulty] as "EASY" | "MEDIUM" | "HARD",
        timeComplexity: validatedData.timeComplexity,
        spaceComplexity: validatedData.spaceComplexity,
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
    
    return NextResponse.json(
      { 
        message: "Question created successfully",
        data: question,
        success: true
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating question:", error);
    await prisma.errorLog.create({
      data: {
        errorAt: '[API] POST admin/questions/route.ts',
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
      { message: "Internal Server Error", data: error, success: false  },
      { status: 500 }
    );
  }
} 