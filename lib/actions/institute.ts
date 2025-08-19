'use server';

import { prisma } from "../prisma";

export async function fetchInstitute() {
    try {
        const institutes = await prisma.institution.findMany({
            where: {
                isActive: true
            },
            include: {
                _count: {
                    select: {
                        users: true,
                    }

                }
            },
        })
        const result = institutes.map((inst) => ({
            ...inst, userCount: inst._count.users,
        })).sort((a, b) => b.userCount - a.userCount);;
        return result
    } catch (error) {
        console.log(error);
        return [];
    }
}

export async function fetchInstituteByCode(code: string) {
    try {
        const institute = await prisma.institution.findUnique({
            where: {
                code
            }, include: {
                _count: {
                    select: {
                        users: true,
                    }

                }
            },
        });
        const result = {...institute, userCount: institute?._count.users}
        return result;
    } catch (error) {
        console.log(error);
        return null;

    }
}