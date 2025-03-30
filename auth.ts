import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    GithubProvider({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
  ],
  pages: {
    signIn: "/get-started",
  },
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id
      return session
    },
    async signIn({ user }) {
      try {
        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email! },
        })

        // If user doesn't exist, create them
        if (!existingUser) {
          await prisma.user.create({
            data: {
              id: user.id,
              name: user.name!,
              email: user.email!,
              image: user.image,
            },
          })
        }
        return true
      } catch (error) {
        console.error("Error during sign in:", error)
        return false
      }
    },
  },
})