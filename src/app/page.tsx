"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";

export default function HomePage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      {session ? (
        <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-md text-center">
          <h1 className="text-2xl font-bold text-blue-600">
            Welcome back, {session.user?.name || "User"} 👋
          </h1>
          <p className="text-gray-600 mt-2">
            You’re logged in as <b>{session.user?.email}</b>
          </p>

          <div className="flex flex-col gap-3 mt-6">
            <Link
              href="/dashboard"
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
            >
              Go to Dashboard
            </Link>
            <button
              onClick={() => signOut()}
              className="bg-gray-200 py-2 px-4 rounded-lg hover:bg-gray-300 transition"
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-md text-center">
          <h1 className="text-3xl font-bold text-blue-600">Monalo</h1>
          <p className="text-gray-600 mt-2">
            Connect with friends and the world around you.
          </p>

          <div className="flex flex-col gap-3 mt-6">
            <button
              onClick={() => signIn("google")}
              className="flex items-center justify-center gap-2 border border-gray-300 py-2 px-4 rounded-lg hover:bg-gray-100 transition"
            >
              <FcGoogle size={20} />
              Continue with Google
            </button>
            <Link
              href="/auth/login"
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
            >
              Log In
            </Link>
            <Link
              href="/auth/signup"
              className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition"
            >
              Create New Account
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}
