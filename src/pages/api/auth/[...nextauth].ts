import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verify } from "argon2";
import { prisma } from "../../../server/db/client";

export const AuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
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
            where: { email: credentials.email },
          });

          // if username returns session
          if (result) {
            // checks if given password matches hashed password from db
            const verifiedPass = await verify(
              result.password,
              credentials.password
            );

            // if password incorrect return null
            if (!verifiedPass) {
              return null;
            }

            // return session with id, username and role
            return {
              id: result.id,
              email: result.email,
              role: result.role,
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        token.email = user.email;
        token.role = user.role;
      }

      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user.userId = token.userId;
        session.user.email = token.email;
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
