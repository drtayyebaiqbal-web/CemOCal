import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";

// Use the lightweight config so middleware runs on the Edge runtime
export const { auth: middleware } = NextAuth(authConfig);

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
};middleware.ts

