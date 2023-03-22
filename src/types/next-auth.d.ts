import { type DefaultSession, type DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      userId: string;
      username: string;
      role: "Customer" | "Admin";
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    username: string;
    role: "Customer" | "Admin";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId: string;
    username: string;
    role: "Customer" | "Admin";
  }
}
