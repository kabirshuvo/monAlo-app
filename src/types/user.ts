//types/user.ts
import { Document } from "mongoose";

export interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  password?: string | null;
  role: "admin" | "learner" | "customer";
  provider: "credentials" | "google";
}
export interface IUserCreate {
  name: string;
  email: string;
  password: string;
  role?: "admin" | "learner" | "customer";
}