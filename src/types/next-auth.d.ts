// src/types/next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";
import { IUser } from "@/types/user";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; 
      name?: string | null;
      email?: string | null;
      role: IUser["role"]; 
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    role: IUser["role"];
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    role: IUser["role"];
  }
}

declare module "next-auth/providers/credentials" {
  interface Credentials {
    email: string;
    password?: string;
  }
}
