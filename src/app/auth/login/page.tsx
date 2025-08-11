// src/app/auth/login/page.tsx
"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl,
    });

    if (res?.error) {
      setError(res.error);
    } else {
      router.push(callbackUrl);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center">
      <div className="flex flex-col md:flex-row items-center justify-center md:justify-around px-6 md:px-20 gap-12">
        
        {/* Left Section */}
        <div className="max-w-md">
          <h1 className="text-blue-600 text-5xl font-bold mb-4">Monalo</h1>
          <p className="text-xl text-gray-700">
            Connect with friends and the world around you on Monalo.
          </p>
        </div>

        {/* Right Section - Login Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm">
          {error && (
            <p className="bg-red-100 text-red-700 p-2 rounded mb-4 text-sm text-center">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg"
            >
              Log In
            </button>
          </form>

          <div className="text-center mt-4">
            <a href="#" className="text-blue-600 text-sm hover:underline">
              Forgot Password?
            </a>
          </div>

          <hr className="my-4" />

          <div className="text-center">
            <button
              onClick={() => router.push("/auth/signup")}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg"
            >
              Create New Account
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 text-center text-xs text-gray-500">
        Monalo © {new Date().getFullYear()}
      </div>
    </div>
  );
// This code defines a login page for a Next.js application using NextAuth for authentication.
// It includes a form for users to enter their email and password, handles login logic, and displays error messages.