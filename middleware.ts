// /middleware.ts

import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const adminRoutes = ["/admin"];
const learnerRoutes = ["/learn"];
const customerRoutes = ["/shop", "/orders"];

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });

  const { pathname } = req.nextUrl;

  // If not logged in
  if (!token) {
    if (pathname.startsWith("/admin") || pathname.startsWith("/learn") || pathname.startsWith("/shop")) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
    return NextResponse.next();
  }

  // Role-based restrictions
  if (adminRoutes.some((route) => pathname.startsWith(route)) && token.role !== "admin") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  if (learnerRoutes.some((route) => pathname.startsWith(route)) && token.role !== "learner") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  if (customerRoutes.some((route) => pathname.startsWith(route)) && token.role !== "customer") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/learn/:path*", "/shop/:path*"],
};
