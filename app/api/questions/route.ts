import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";

// Schema for validation
const testCaseSchema = z.object({
  input: z.string().min(1, "Input is required"),
  output: z.string().min(1, "Output is required"),
  explanation: z.string().min(1, "Explanation is required"),
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
  sampleCode: z.string().min(10, "Sample code must be at least 10 characters"),
});

// GET handler to retrieve all questions
export async function GET() {
  try {
    const questions = await prisma.question.findMany({
      include: {
        testCases: true,
        constraints: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    // Map the database questions to the frontend format
    const mappedQuestions = questions.map(question => {
      // Map database enum to frontend enum
      const difficultyMap: Record<string, "Easy" | "Medium" | "Hard"> = {
        "EASY": "Easy",
        "MEDIUM": "Medium",
        "HARD": "Hard",
      };
      
      return {
        id: question.id,
        title: question.title,
        description: question.description,
        difficulty: difficultyMap[question.difficulty],
        timeComplexity: question.timeComplexity,
        spaceComplexity: question.spaceComplexity,
        sampleCode: question.sampleCode,
        section: question.section,
        topic: question.topicName,
        testCases: question.testCases,
        constraints: question.constraints.map(c => c.value),
        createdAt: question.createdAt,
        updatedAt: question.updatedAt,
      };
    });
    
    return NextResponse.json({ 
      questions: mappedQuestions 
    });
  } catch (error) {
    console.error("Error fetching questions:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Skip auth check for now during development
    // const session = await getServerSession(authOptions);
    
    // if (!session) {
    //   return NextResponse.json(
    //     { message: "Unauthorized" },
    //     { status: 401 }
    //   );
    // }
    
    // if (session.user.role !== "ADMIN") {
    //   return NextResponse.json(
    //     { message: "Forbidden: Admin access required" },
    //     { status: 403 }
    //   );
    // }
    
    // Parse and validate the request body
    const body = await request.json();
    const validatedData = questionSchema.parse(body);
    
    // Convert difficulty to proper enum format
    const difficultyMap = {
      Easy: "EASY",
      Medium: "MEDIUM",
      Hard: "HARD",
    };
    
    // Create the question in the database
    const question = await prisma.question.create({
      data: {
        title: validatedData.title,
        description: validatedData.description,
        difficulty: difficultyMap[validatedData.difficulty] as "EASY" | "MEDIUM" | "HARD",
        timeComplexity: validatedData.timeComplexity,
        spaceComplexity: validatedData.spaceComplexity,
        sampleCode: validatedData.sampleCode,
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
      },
    });
    
    return NextResponse.json(
      { 
        message: "Question created successfully",
        questionId: question.id
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating question:", error);
    
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