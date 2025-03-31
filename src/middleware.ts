import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req: request, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // If the user is not signed in and the current path is not /admin/login,
  // redirect to /admin/login
  if (!session && !request.nextUrl.pathname.endsWith("/login")) {
    const redirectUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(redirectUrl);
  }

  // If the user is signed in and trying to access the login page,
  // redirect to /admin/dashboard
  if (session && request.nextUrl.pathname.endsWith("/login")) {
    const redirectUrl = new URL("/admin/dashboard", request.url);
    return NextResponse.redirect(redirectUrl);
  }

  return res;
}

export const config = {
  matcher: ["/admin/:path*"],
};
