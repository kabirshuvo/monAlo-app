import mongoose, { Schema, model, models } from "mongoose";
import { IUser } from "@/types/user";
//Cannot find module '@/types/user' or its corresponding type declarations.ts(2307)

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, select: false }, // Hide by default
    role: { type: String, enum: ["admin", "learner", "customer"], default: "customer" },
    provider: { type: String, enum: ["credentials", "google"], default: "credentials" },
  },
  { timestamps: true }
);

export const User = models.User<IUser> || model<IUser>("User", userSchema);
