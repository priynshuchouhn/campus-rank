"use server"

import { prisma } from "@/lib/prisma"
import { z } from "zod"
import { auth } from "@/auth"
import { Difficulty, ProgrammingLanguage } from "@prisma/client"

// Schema for validation
const testCaseSchema = z.object({
    input: z.string().min(1, "Input is required"),
    output: z.string().min(1, "Output is required"),
    explanation: z.string().min(1, "Explanation is required"),
})

const sampleCodeSchema = z.object({
    language: z.enum(["javascript", "typescript", "python", "java", "cpp"]),
    code: z.string().min(10, "Sample code must be at least 10 characters"),
})

const baseSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    difficulty: z.enum(["Easy", "Medium", "Hard"]),
    questionType: z.enum(["CODE", "MCQ"]),
})

// For coding questions
const codeQuestionSchema = baseSchema.extend({
    questionType: z.literal("CODE"),
    timeComplexity: z.string().min(1, "Time complexity is required"),
    spaceComplexity: z.string().min(1, "Space complexity is required"),
    testCases: z.array(testCaseSchema).min(1, "At least one test case is required"),
    constraints: z.array(z.string().min(1, "Constraint cannot be empty")).min(1, "At least one constraint is required"),
    sampleCodes: z.array(sampleCodeSchema).min(1, "At least one sample code is required"),
})

// For MCQs
const mcqQuestionSchema = baseSchema.extend({
    questionType: z.literal("MCQ"),
    options: z.array(z.string().min(1, "Option cannot be empty")).min(2, "At least two options are required"),
    correctOption: z.string().min(1, "Correct option is required"),
    explanation: z.string().min(1, "Explanation is required"),
})

// ✅ Use discriminated union
const questionSchema = z.discriminatedUnion("questionType", [
    codeQuestionSchema,
    mcqQuestionSchema,
])

const difficultyMap: Record<Difficulty, "Easy" | "Medium" | "Hard"> = {
    EASY: "Easy",
    MEDIUM: "Medium",
    HARD: "Hard",
}

// UI → DB
const difficultyInputMap: Record<"Easy" | "Medium" | "Hard", Difficulty> = {
    Easy: Difficulty.EASY,
    Medium: Difficulty.MEDIUM,
    Hard: Difficulty.HARD,
}

export async function getAdminQuestions(page: string = "1", pageSize: string = "25") {
    try {
        const session = await auth()
        if (!session?.user || session.user.role !== "ADMIN") {
            return {
                message: "Unauthorized",
                success: false,
                data: null,
            }
        }

        const skip = (+page - 1) * +pageSize

        const [questions, total] = await Promise.all([
            prisma.question.findMany({
                select: {
                    id: true,
                    title: true,
                    questionType: true,
                    difficulty: true,
                    createdAt: true,
                    updatedAt: true,
                    testCases: true,
                    predefinedTopic: {
                        select: {
                            title: true,
                            predefinedSection: {
                                select: {
                                    title: true,
                                    subject: {
                                        select: {
                                            subjectName: true
                                        }
                                    }
                                },
                            }
                        },
                    }
                },
                orderBy: { createdAt: "desc" },
                skip,
                take: +pageSize,
            }),
            prisma.question.count(),
        ])

        // const difficultyMap: Record<"Easy" | "Medium" | "Hard", Difficulty> = {
        //     Easy: "EASY",
        //     Medium: "MEDIUM",
        //     Hard: "HARD",
        // }

        const formattedQuestions = questions.map((q) => ({
            id: q.id,
            title: q.title,
            questionType: q.questionType,
            difficulty: q.difficulty,
            createdAt: q.createdAt,
            updatedAt: q.updatedAt,
            testCases: q.testCases,
            topic: q.predefinedTopic?.title || null,
            section: q.predefinedTopic?.predefinedSection?.title || null,
            subject: q.predefinedTopic?.predefinedSection?.subject?.subjectName || null,
        }))

        return {
            message: "Questions fetched successfully",
            data: {
                questions: formattedQuestions,
                pagination: {
                    total,
                    page: +page,
                    limit: +pageSize,
                    totalPages: Math.ceil(total / +pageSize),
                },
            },
            success: true,
        }
    } catch (error) {
        console.error("Error fetching questions:", error)
        await prisma.errorLog.create({
            data: {
                errorAt: "[Action] getAdminQuestions",
                error: error instanceof Error ? error.message : "Unknown error",
            },
        })

        return {
            message: "Error fetching questions",
            error: error instanceof Error ? error.message : "Unknown error",
            success: false,
        }
    }
}


export async function createQuestion(data: unknown) {
    try {
        const session = await auth()
        if (!session?.user || session.user.role !== "ADMIN") {
            throw new Error("Unauthorized")
        }

        const validatedData = questionSchema.parse(data)

        // const difficultyMap: Record<"Easy" | "Medium" | "Hard", Difficulty> = {
        //     Easy: "EASY",
        //     Medium: "MEDIUM",
        //     Hard: "HARD",
        // }

        const languageMap: Record<
            "javascript" | "typescript" | "python" | "java" | "cpp",
            ProgrammingLanguage
        > = {
            javascript: "JAVASCRIPT",
            typescript: "TYPESCRIPT",
            python: "PYTHON",
            java: "JAVA",
            cpp: "CPP",
        }

        let question

        if (validatedData.questionType === "CODE") {
            // ✅ Narrowed to codeQuestionSchema
            question = await prisma.question.create({
                data: {
                    title: validatedData.title,
                    description: validatedData.description,
                    questionType: "CODE",
                    difficulty: difficultyInputMap[validatedData.difficulty],
                    timeComplexity: validatedData.timeComplexity,
                    spaceComplexity: validatedData.spaceComplexity,
                    testCases: {
                        create: validatedData.testCases.map((t) => ({
                            input: t.input,
                            output: t.output,
                            explanation: t.explanation,
                        })),
                    },
                    constraints: {
                        create: validatedData.constraints.map((c) => ({ value: c })),
                    },
                    sampleCodes: {
                        create: validatedData.sampleCodes.map((s) => ({
                            language: languageMap[s.language],
                            code: s.code,
                        })),
                    },
                },
            })
        } else {
            // ✅ Narrowed to mcqQuestionSchema
            question = await prisma.question.create({
                data: {
                    title: validatedData.title,
                    description: validatedData.description,
                    questionType: "MCQ",
                    difficulty: difficultyInputMap[validatedData.difficulty],
                    options: validatedData.options,
                    correctOption: validatedData.correctOption,
                    explanation: validatedData.explanation,
                },
            })
        }

        return question
    } catch (error) {
        console.error("Error creating question:", error)
        await prisma.errorLog.create({
            data: {
                errorAt: "[Action] createQuestion",
                error: error instanceof Error ? error.message : "Unknown error",
            },
        })

        if (error instanceof z.ZodError) {
            throw new Error("Validation error: " + JSON.stringify(error.errors))
        }
        throw error
    }
}
