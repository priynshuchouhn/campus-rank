import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function getUser() {
    const session = await auth();
    const email = session?.user?.email;
    if (!email) {
        throw new Error("User not found");
    }
    const user = await prisma.user.findUnique({
        where: { email: email },
    });
    return user;
}