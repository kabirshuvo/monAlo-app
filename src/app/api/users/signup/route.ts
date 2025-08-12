import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/models/user";
import { IUser } from "@/types/user";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password, provider } = body as {
      name?: string;
      email?: string;
      password?: string;
      provider?: "credentials" | "google";
    };

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    await connectToDatabase();

    // Check if user already exists
    const existingUser = await User.findOne({ email }).lean<IUser | null>();
    if (existingUser) {
      return NextResponse.json({ error: "Email is already registered" }, { status: 400 });
    }

    let hashedPassword: string | undefined;

    if (provider === "credentials") {
      if (!password) {
        return NextResponse.json({ error: "Password is required for credentials signup" }, { status: 400 });
      }
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword || null,
      provider: provider || "credentials",
      role: "customer",
    });

    return NextResponse.json(
      {
        message: "User created successfully",
        user: {
          id: newUser._id.toString(),
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          provider: newUser.provider,
        },
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
