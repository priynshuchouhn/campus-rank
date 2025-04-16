'use server';
import { signOut } from "@/auth";
import { redirect } from "next/navigation";
export async function signOutAction() {
    console.log("Signing out");
    await signOut(
        {
            redirect: false,
        }
    );
    redirect('/');
}