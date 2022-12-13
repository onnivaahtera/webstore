import NextAuth, {
  type DefaultSession,
  JWT,
  type DefaultUser,
  User,
} from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      userId: string;
      username: string;
      role: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    username: string;
    role: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId: string;
    username: string;
    role: string;
  }
}
