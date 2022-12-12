import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verify } from "argon2";

import { prisma } from "../../../server/db/client";
import { loginSchema } from "../../../auth/validation/auth";

export const AuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          // const { email, password } = await loginSchema.parseAsync(credentials);

          if (!credentials) {
            return null;
          }

          const result = await prisma.user.findFirst({
            where: { email: credentials.email },
          });

          if (!result) return "User not found";

          const verifiedPass = verify(result.password, credentials.password);

          if (!verifiedPass) {
            return "Wrong password";
          }

          return {
            id: result.id,
            email: result.email,
            username: result.username,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } as any;
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
        token.email = user.email;
        token.username = user.username;
      }

      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user.userId = token.userId;
        session.user.email = token.email;
        session.user.username = token.username;
      }

      return session;
    },
  },
  jwt: {
    maxAge: 15 * 24 * 30 * 60,
  },
  pages: {
    // signIn: "/account/login",
  },
  secret: "super-secret",
};

export default NextAuth(AuthOptions);
