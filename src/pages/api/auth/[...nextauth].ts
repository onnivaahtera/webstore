import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verify } from "argon2";

import { prisma } from "../../../server/db/client";

export const AuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          // check if credentials were provided if not return null
          if (!credentials) {
            return null;
          }
          // checks if given username exists in database
          const result = await prisma.user.findFirst({
            where: { username: credentials.username },
          });
          if (result) {
            const verifiedPass = await verify(
              result.password,
              credentials.password
            );
            if (!verifiedPass) {
              return null;
            }
            return {
              id: result.id,
              username: result.username,
              role: result.role,
            } as any;
          }
          // if error catch
        } catch {
          return "Error occurred";
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.userId = user.id;
        token.username = user.username;
        token.role = user.role;
      }

      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user.userId = token.userId;
        session.user.username = token.username;
        session.user.role = token.role;
      }

      return session;
    },
  },
  // set jwt expiration date
  jwt: {
    maxAge: 15 * 24 * 30,
  },
  // set custom login page
  pages: {
    signIn: "/account/login",
  },
  // set secret
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(AuthOptions);
