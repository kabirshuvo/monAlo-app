import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";

// এখানে Role টাইপ ডিফাইন করা হলো
type UserRole = "admin" | "learner" | "customer";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: UserRole;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    role: UserRole;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    role: UserRole;
  }
}

declare module "next-auth/providers/credentials" {
  interface Credentials {
    email: string;
    password?: string;
  }
}
