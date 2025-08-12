"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/users/signup", {
      method: "POST",
      body: JSON.stringify({ name, email, password, provider: "credentials" }),
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Something went wrong");
      return;
    }

    // Auto login after signup
    await signIn("credentials", { email, password, redirect: false });
    router.push("/");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Create Account</h1>

        {error && (
          <p className="bg-red-100 text-red-600 p-2 rounded mb-4">{error}</p>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border rounded"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">or</p>
          <button
            onClick={() => signIn("google")}
            className="w-full bg-red-500 text-white p-3 rounded mt-3 hover:bg-red-600"
          >
            Sign Up with Google
          </button>
        </div>

        <div className="mt-6 text-center text-sm">
          Already have an account?{" "}
          <a href="/auth/login" className="text-blue-600 hover:underline">
            Log In
          </a>
        </div>
      </div>
    </div>
  );
}
