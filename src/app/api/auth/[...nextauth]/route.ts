// src/app/api/auth/[...nextauth]/route.ts
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/models/user";
import { IUser } from "@/types/user";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Email and password required");
        }

        await connectToDatabase();

        // Explicitly set the lean type to IUser so _id, password, etc. are typed correctly
        const user = await User.findOne({ email: credentials.email })
          .select("+password")
          .lean<IUser>();

        if (!user) {
          throw new Error("User not found");
        }

        if (!user.password) {
          throw new Error("This account does not have a password (Google login?)");
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

        return {
          id: user._id.toString(), // ✅ Now string, no unknown type
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      await connectToDatabase();

      if (account?.provider === "google") {
        const existingUser = await User.findOne({ email: user.email }).lean<IUser>();
        if (!existingUser) {
          await User.create({
            name: user.name,
            email: user.email,
            provider: "google",
            role: "customer",
          });
        }
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.role = (user as IUser).role || "customer";
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        (session.user as IUser).role = token.role as IUser["role"];
      }
      return session;
    },
  },

  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
