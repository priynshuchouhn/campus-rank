'use server';

import { getCachedInstituteByCode, getCachedInstitutes } from "../public-cache";

export async function fetchInstitute() {
    try {
        return getCachedInstitutes();
    } catch (error) {
        console.log(error);
        return [];
    }
}

export async function fetchInstituteByCode(code: string) {
    try {
        return getCachedInstituteByCode(code);
    } catch (error) {
        console.log(error);
        return null;

    }
}
