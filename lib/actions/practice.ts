'use server';
import { prisma } from "../prisma";

export async function fetchSubjectsToPracticeWithTopic(){
    try {
        const subjects = await prisma.subject.findMany({
            where:{
                isCoreSubject: false
            },
            include:{
                sections: {
                    include:{
                        topics: true
                    }
                }
            }
        });
        return subjects;
    } catch (error) {
        console.log(error);
        return [];
    }
}