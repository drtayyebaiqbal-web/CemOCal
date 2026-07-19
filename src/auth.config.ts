// Lightweight config used in middleware (Edge-compatible, no Prisma)
import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isPublic =
        nextUrl.pathname === "/" ||
        nextUrl.pathname.startsWith("/auth") ||
        nextUrl.pathname.startsWith("/api/auth");

      if (isPublic) return true;
      if (isLoggedIn) return true;

      // Redirect unauthenticated to sign-in
      return Response.redirect(new URL("/auth/signin", nextUrl));
    },
  },
  providers: [], // filled in src/auth.ts
} satisfies NextAuthConfig;
