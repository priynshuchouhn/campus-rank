'use server'
import axios from "axios";

const JUDGE0_HEADERS = {
    "Content-Type": "application/json",
    "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
    "x-rapidapi-key": process.env.NEXT_PUBLIC_JUDGE0_API_KEY as string, // set in .env.local
};

export const executeCode = async (source_code:string, language_id:number, stdin:string) => {
    const response = await axios.post(
        `${process.env.JUDGE0_API_URI}/submissions?base64_encoded=false&wait=true`,
        { source_code, language_id, stdin },
        { headers: JUDGE0_HEADERS }
    );
    return response.data;
};
