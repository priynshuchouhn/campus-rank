import NextAuth, { DefaultSession } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import { prisma } from "./lib/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
declare module "next-auth" {
  interface User {
    role: string;
  }
  interface Session {
    user: {
      id: string;
      name: string | null;
      email: string | null;
      image: string | null;
      role: string;
    } & DefaultSession["user"];
  }

}

async function saveUserToDatabase(userInfo: {
  name: string | null;
  email: string | null;
  image: string | null;
}) {
  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: userInfo.email ?? undefined },
    })

    // If userInfo doesn't exist, create them
    if (!existingUser) {
      const baseUsername = userInfo.name
        ? userInfo.name.toLowerCase().replace(/[^a-z0-9]/g, '')
        : userInfo.email!.split('@')[0];

      // Keep trying until we find a unique username
      let username = baseUsername;
      let counter = 1;
      let isUnique = false;

      while (!isUnique) {
        const existingUser = await prisma.user.findUnique({
          where: { username }
        });

        if (existingUser) {
          username = `${baseUsername}${counter}`;
          counter++;
        } else {
          isUnique = true;
        }
      }

      const user = await prisma.user.create({
        data: {
          name: userInfo.name!,
          email: userInfo.email!,
          image: userInfo.image,
          emailVerified: new Date(),
          username: username,
          lastLogin: new Date(),
        },
      })
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/email/welcome`, {
        method: 'POST',
        body: JSON.stringify({ name: user.name, email: user.email }),
      })
      return user;
    }
    await prisma.user.update({
      where: { id: existingUser.id },
      data: { lastLogin: new Date() },
    })
    return existingUser;
  } catch (error) {
    console.error("Error during user sign in:", error)
    return null
  }
}

async function authorizeAdmin(credentials: { email: string, password: string }) {
  const { email, password } = credentials;
  if (!email || !password) {
    throw new Error("Invalid credentials");
  }
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/auth`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  if (data.success) {
    return data.data;
  }
  return null;
}


export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 1 day
    updateAge: 0,         // prevent refresh on activity
  },
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    GithubProvider({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const { email, password } = credentials;
          if (!email || !password) {
            throw new Error("Invalid credentials");
          }
          const admin = await authorizeAdmin({ email: email as string, password: password as string });
          if (admin) {
            return admin;
          }
          return null;
        } catch (error) {
          console.error("Error during admin sign in:", error)
          return null;
        }
      },
    }),

  ],
  pages: {
    signIn: "/get-started",
  },
  callbacks: {
    async signIn({ user }) {
      // This callback is triggered on successful sign-in.
      // If the provider returns a role (for example ADMIN from credentials)
      // redirect through a small API route that sets a `user-role` cookie
      // and then forwards the user to the dashboard. For normal users
      // continue the default flow and ensure they exist in the DB.
      if (user && user.role === "ADMIN") {
        // Redirect to an endpoint that will set the role cookie
        return `/api/auth/set-role?role=ADMIN&callbackUrl=/admin/dashboard`;
      }

      // Save or update the user in our DB for non-admin signins.
      await saveUserToDatabase({
        name: user.name ?? null,
        email: user.email ?? null,
        image: user.image ?? null,
      });

      // For regular users we still want a role cookie (USER) so the
      // edge middleware can make lightweight checks. Redirect through
      // the same helper which will set `user-role=USER` then forward.
      return `/api/auth/set-role?role=USER&callbackUrl=/profile`;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/profile');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/profile', nextUrl));
        //   return true
      }
      return false;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.name = token.name as string;
      session.user.email = token.email as string;
      session.user.image = token.image as string;
      session.user.role = token.role as string;
      return session;
    },
    async jwt({ token, user, }) {
      if (user) {

        const DbUser = await saveUserToDatabase({
          name: user.name ?? null,
          email: user.email ?? null,
          image: user.image ?? null,
        });
        if (!DbUser) throw new Error("Failed to save user to database");

        // Add DbUser data to the token
        token.id = DbUser.id;
        token.name = DbUser.name;
        token.email = DbUser.email;
        token.image = DbUser.image;
        token.role = DbUser.role;

      }
      return token;
    }
  },
})