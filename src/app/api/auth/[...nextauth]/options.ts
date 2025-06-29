import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { supabase } from "@/lib/supabase";
import NextAuth from "next-auth";

// Debug environment variables
console.log("🔍 NextAuth Environment Variables:");
console.log("GITHUB_ID:", process.env.GITHUB_ID);
console.log(
  "GITHUB_SECRET:",
  process.env.GITHUB_SECRET ? "***SET***" : "NOT SET"
);
console.log("GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID);
console.log(
  "GOOGLE_CLIENT_SECRET:",
  process.env.GOOGLE_CLIENT_SECRET ? "***SET***" : "NOT SET"
);
console.log(
  "NEXTAUTH_SECRET:",
  process.env.NEXTAUTH_SECRET ? "***SET***" : "NOT SET"
);
console.log("NEXTAUTH_URL:", process.env.NEXTAUTH_URL);

export const options: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Enter your username",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.username || !credentials?.password) {
            return null;
          }

          // Query user from Supabase
          const { data: user, error } = await supabase
            .from("users")
            .select("id, username, email, password")
            .eq("username", credentials.username)
            .single();

          if (error || !user) {
            console.log("User not found:", credentials.username);
            return null;
          }

          // Check password (in production, you should hash passwords)
          if (user.password === credentials.password) {
            return {
              id: user.id,
              name: user.username,
              email: user.email,
            };
          }

          console.log("Invalid password for user:", credentials.username);
          return null;
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
  debug: true, // Enable debug mode
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        if (!session.user) session.user = {};
        (session.user as any).id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
      }
      return session;
    },
  },
};
