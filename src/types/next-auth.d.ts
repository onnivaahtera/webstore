import { type DefaultSession, type DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      userId: string;
      username: string;
      role: Role;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    username: string;
    role: Role;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId: string;
    username: string;
    role: role;
  }
}

export type role = "Customer" | "Admin";
