// hooks/useUserSession.ts

"use client";

import { useSession } from "next-auth/react";

export const useUserSession = () => {
  const { data: session, status } = useSession();

  const isLoading = status === "loading";
  const isAuthenticated = status === "authenticated";
  const role = session?.user?.role;

  return {
    session,
    status,
    isLoading,
    isAuthenticated,
    role,
  };
};
