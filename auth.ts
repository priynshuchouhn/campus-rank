import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function saveUserToDatabase(userInfo: {
  name: string | null;
  email: string | null;
  image: string | null;
  provider?: string;
  providerAccountId?: string;
}) {
    try {
        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
          where: { email: userInfo.email ?? undefined },
        })

        // If userInfo doesn't exist, create them
        if (!existingUser) {
          const user =await prisma.user.create({
            data: {
              name: userInfo.name!,
              email: userInfo.email!,
              image: userInfo.image,
            },
          })
          return user;
        }
        return existingUser;
      } catch (error) {
        console.error("Error during sign in:", error)
        return null
      }
  }
  

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
    async signIn({ user, account }) {
        // This callback is triggered on successful sign-in.
  
        await saveUserToDatabase({
          name: user.name ?? null,
          email: user.email ?? null, 
          image: user.image ?? null,
          provider: account?.provider,
          providerAccountId: account?.providerAccountId
        });
  
        return true;
      },
      authorized({ auth, request: { nextUrl } }) {
        const isLoggedIn = !!auth?.user;
        const isOnDashboard = nextUrl.pathname.startsWith('/profile');
        if (isOnDashboard) {
          if (isLoggedIn) return true;
          return false; // Redirect unauthenticated users to login page
        } else if (isLoggedIn) {
          // return Response.redirect(new URL('/dashboard', nextUrl));
          return true
        }
        return false;
      },
      async session({ session, token }) {
        session.user.id = token.id as string;
        session.user.name = token.name;
        session.user.email = token.email as string;
        session.user.image = token.image as string;
        return session;
      },
      async jwt({ token, user, account, }) {
        if (user) {
          
          const DbUser = await saveUserToDatabase({
            name: user.name ?? null,
            email: user.email ?? null,
            image: user.image ?? null,
            provider: account?.provider,
            providerAccountId: account?.providerAccountId
          });
          if (!DbUser) throw new Error("Failed to save user to database");
  
          // Add DbUser data to the token
          token.id = DbUser.id;
          token.name = DbUser.name;
          token.email = DbUser.email;
          token.image = DbUser.image;
        }
        return token;
      }
  },
})