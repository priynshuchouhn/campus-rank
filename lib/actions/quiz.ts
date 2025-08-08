'use server';

import { auth } from "@/auth";
import { prisma } from "../prisma";
import { slugify } from "../utils";

export async function createQuiz(topicId: string) {
    const session = await auth();
    if (!session) return;
    const questions = await prisma.question.findMany({
        where: {
            predefinedTopicId: topicId
        },
        select: {
            id: true,
        }
    });
    // If less than 5 questions, return or handle accordingly
    if (questions.length < 5) {
        throw new Error("Not enough questions to create a quiz");
    }

    // Step 2: Generate a random number between 5 and total questions
    const numQuestions = Math.floor(Math.random() * (questions.length - 5 + 1)) + 5;

    // Step 3: Shuffle and pick random questions
    const shuffled = questions.sort(() => 0.5 - Math.random());
    const selectedQuestions = shuffled.slice(0, numQuestions);

    const quiz = await prisma.quiz.create({
        data: {
            topicId,
            userId: session?.user.id,
            timeAlloted: selectedQuestions.length * 60 * 1000,
            questions: {
                connect: selectedQuestions.map(el => ({ id: el.id }))
            }
        },
        include: {
            topic: {
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
                        }
                    }
                }
            }
        }
    });
    return { examId: quiz.id, subject: slugify(quiz.topic.predefinedSection.subject.subjectName), section: slugify(quiz.topic.predefinedSection.title), topic: slugify(quiz.topic.title) };
}

export async function fetchQuiz(quizId: any) {
    const session = await auth();
    if (!session) return;
    try {
        const quiz = await prisma.quiz.findUnique({
            where: {
                id: quizId,
                userId: session.user.id
            }, include: {
                questions: true
            }
        })
        return quiz;
    } catch (error) {
        console.log(error)
        return null;
    }
}


export async function fetchNotSubmittedQuiz() {
    const session = await auth();
    if (!session) return;
    try {
        const quizes = await prisma.quiz.findMany({
            where: {
                userId: session.user.id,
                status: {
                    not: "SUBMITTED"
                }
            },
            orderBy: {
                createdAt: 'desc'
            }, include: {
                topic: {
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
                            }
                        }
                    }
                }
            }
        })
        return quizes;
    } catch (error) {
        console.log(error)
        return [];
    }
}