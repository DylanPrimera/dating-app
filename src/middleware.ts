import { NextRequest, NextResponse } from "next/server";
import { authRoutes, publicRoutes, userRoutes } from "./routes";
import { getToken } from "next-auth/jwt";
import { Role } from "@prisma/client";

export async function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isUserRoute = userRoutes.includes(nextUrl.pathname);
  
  const token = await getToken({ 
    req: request, 
    secret: process.env.AUTH_SECRET! 
  });


  const isLoggedIn = !!token;
  const userRole = token?.role as Role || null;


  if (isPublicRoute) {
    return NextResponse.next();
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/members", nextUrl));
    }
    return NextResponse.next();
  }
  if(isUserRoute && userRole === 'ADMIN') {
    if(isLoggedIn) {
      return NextResponse.redirect(new URL("/admin/moderation", nextUrl));
    }
    return NextResponse.next();
  }

  if(isUserRoute && userRole === 'MEMBER') {
    if(isLoggedIn) {
      return NextResponse.redirect(new URL("/members", nextUrl));
    }
    return NextResponse.next();
  }

  if (!isPublicRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
