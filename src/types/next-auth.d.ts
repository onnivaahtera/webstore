import NextAuth, { DefaultSession, JWT, DefaultUser, User } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      userId: number;
      username: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    username: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId: number;
    username: string;
  }
}
