import { betterFetch } from "@better-fetch/fetch";
import { NextResponse, type NextRequest } from "next/server";
import type { Session } from "@/lib/auth";
import { getSessionCookie } from "better-auth/cookies";

const authRoutes = ["/sign-in", "/sign-up"];
const passwordRoutes = ["/reset-password", "/forgot-password"];
const adminRoutes = ["/admin"];

export default async function authMiddleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname;
  const isAuthRoute = authRoutes.includes(pathName);
  const isPasswordRoute = passwordRoutes.includes(pathName);
  const isAdminRoute = adminRoutes.includes(pathName);
  const sessionCookie = getSessionCookie(request);
  // console.log('sessionCookie: ', sessionCookie)  

  if (!sessionCookie) {
    if (isAuthRoute || isPasswordRoute) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (isAuthRoute || isPasswordRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isAdminRoute) {
    const { data: session } = await betterFetch<Session>(
      "/api/auth/get-session",
      {
        baseURL: process.env.BETTER_AUTH_URL,
        headers: {
          cookie: request.headers.get("cookie") || "",
        },
      },
    );
    // console.log('session: ', session)
    if (!session || session.user?.role !== "admin") {   
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};

// import { getSessionCookie } from "better-auth/cookies";
// import { NextRequest, NextResponse } from "next/server";

// export async function middleware(request: NextRequest) {
//     const sessionCookie = getSessionCookie(request); // Optionally pass config as the second argument if cookie name or prefix is customized.
//     if (!sessionCookie) {
//         return NextResponse.redirect(new URL("/", request.url));
//     }
//     return NextResponse.next();
// }

// export const config = {
//     matcher: ["/dashboard"],
// };