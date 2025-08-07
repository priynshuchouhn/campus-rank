'use server';
import { prisma } from "../prisma";

export async function fetchSubjectsToPracticeWithTopic() {
    try {
        // const subjects = await prisma.subject.findMany({
        //     where:{
        //         isCoreSubject: false
        //     },
        //     include:{
        //         sections: {
        //             include:{
        //                 topics: true
        //             }
        //         }
        //     }
        // });
        const subjects = await prisma.subject.findMany({
            where: {
                isCoreSubject: false,
            },
            include: {
                sections: {
                    where: {
                        topics: {
                            some: {
                                questions: {
                                    some: {}, // means "has at least one question"
                                },
                            },
                        },
                    },
                    include: {
                        topics: {
                            where: {
                                questions: {
                                    some: {}, // only include topics that have questions
                                },
                            },
                            include: {
                                questions: true, // if you want to include the questions too
                            },
                        },
                    },
                },
            },
        });

        return subjects;
    } catch (error) {
        console.log(error);
        return [];
    }
}