'use server';
import { getCachedPracticeSubjects } from "../public-cache";

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
        return getCachedPracticeSubjects();
    } catch (error) {
        console.log(error);
        return [];
    }
}
