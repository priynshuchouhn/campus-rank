'use server'
import { signIn } from "@/auth";
import { redirect } from "next/navigation";
import { AuthError } from "next-auth";

export const githubSignin = async (formData: FormData): Promise<void> =>{
    const url = (formData.get('url') as string) || "/profile";
    await signIn("github", {
        redirectTo: url,
    });
}
export const googleSignin = async (formData: FormData): Promise<void> =>{
    const url = (formData.get('url') as string) || "/profile";
    await signIn("google", {
        redirectTo: url,
    });
}

export const signin = async (data: { email: string, password: string }) => {
    try {
        await signIn('credentials', {
            email: data.email,
            password: data.password,
            redirect: false,
        });

        redirect('/admin/dashboard');
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials" };
                default:
                    return { error: "Something went wrong" };
            }
        }
        throw error;
    }
};