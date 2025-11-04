'use server';
import axios from "axios";

const JUDGE0_HEADERS = {
    "Content-Type": "application/json",
    "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
    "x-rapidapi-key": process.env.JUDGE0_API_KEY as string, // set in .env.local
};

export const executeCode = async (source_code:string, language_id:number) => {
    const encodedSourceCode = Buffer.from(source_code).toString('base64');
    const payload = {
        source_code:encodedSourceCode, language_id
    }
    if(language_id == 54){
        Object.assign(payload, {"compiler_options": "-std=c++17"})
    }
    const response = await axios.post(
        `${process.env.NEXT_PUBLIC_JUDGE0_API_URI}/submissions?base64_encoded=true&wait=true`,
        payload,
        { headers: JUDGE0_HEADERS }
    );
    // const a = response.data.compile_output ?  Buffer.from(response.data.compile_output,'base64').toString('utf-8') : ''
    return response.data;
};

export const executeBatchCode = async (source_code:string, language_id:number, stdin:string) => {
    const response = await axios.post(
        `${process.env.NEXT_PUBLIC_JUDGE0_API_URI}/submissions/batch?base64_encoded=false&wait=true`,
        { source_code, language_id, stdin },
        { headers: JUDGE0_HEADERS }
    );
    return response.data;
};
