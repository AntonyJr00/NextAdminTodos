import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";

import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";

import prisma from "./app/lib/prisma";
import Credentials from "next-auth/providers/credentials";
import { signInEmailPassword } from "./auth/action/auth-action";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,

  providers: [
    Github({
      clientId: process.env.AUTH_GITHUB_ID ?? "",
      clientSecret: process.env.AUTH_GITHUB_SECRET ?? "",
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    Credentials({
      name: "Credencials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "user@google.com",
        },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        if (credentials) {
          const user = await signInEmailPassword(
            credentials.email,
            credentials.password
          );
          return user ? user : null;
        } else {
          return null;
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async signIn({ user, account, credentials, email, profile }) {
      return true;
    },
    async jwt({ token, user, profile, account }) {
      const dbUser = await prisma.user.findUnique({
        where: { email: token.email ?? "no-email" },
      });

      if (dbUser?.isActive === false) {
        throw Error("Usuario no activo");
      }

      token.role = dbUser?.role ?? ["no-role"];
      token.id = dbUser?.id ?? "no-uuid";

      return token;
    },
    async session({ newSession, session, user, token, trigger }) {
      if (session.user) {
        session.user.role = token.role;
        session.user.id = token.id;
      }
      return session;
    },
  },
};

export const handlers = NextAuth(authOptions);
