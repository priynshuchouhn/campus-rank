'use server';
import { signOut } from "@/auth";

export async function signOutAction() {
    console.log("Signing out");
    try {
        await signOut(
            {
                redirectTo: "/",
            }
        );
    } catch (error) {
        console.error(error);
    }
}