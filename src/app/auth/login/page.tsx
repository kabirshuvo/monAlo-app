"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc"; // Google Icon

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await signIn("credentials", {
      redirect: false,
      email: form.email,
      password: form.password,
    });

    setLoading(false);

    if (res?.ok) {
      router.push("/");
    } else {
      alert(res?.error || "Login failed");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-4xl p-4">
        
        {/* Left side - Intro text */}
        <div className="flex-1 mb-6 md:mb-0 md:pr-8">
          <h1 className="text-blue-600 text-5xl font-bold mb-3">Monalo</h1>
          <p className="text-lg text-gray-700">
            Connect and learn with people all around the world.
          </p>
        </div>

        {/* Right side - Login form */}
        <div className="flex-1 bg-white shadow-md rounded-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>

          <div className="my-4 flex items-center">
            <hr className="flex-1 border-gray-300" />
            <span className="px-3 text-gray-500">or</span>
            <hr className="flex-1 border-gray-300" />
          </div>

          {/* Google Login Button */}
          <button
            onClick={() => signIn("google")}
            className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 py-2 rounded-lg font-medium hover:bg-gray-50 transition"
          >
            <FcGoogle size={22} />
            <span>Continue with Google</span>
          </button>

          <div className="text-center mt-6">
            <a
              href="/auth/signup"
              className="inline-block bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition"
            >
              Create new account
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
