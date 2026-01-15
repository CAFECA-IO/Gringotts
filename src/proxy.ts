import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const isConfigured = process.env.NEXT_PUBLIC_APP_CONFIGURED === "true";
  const isSetupPage = request.nextUrl.pathname.startsWith("/setup");
  const isSetupApi = request.nextUrl.pathname.startsWith("/api/setup");
  const isStaticAsset =
    request.nextUrl.pathname.startsWith("/_next") ||
    request.nextUrl.pathname.startsWith("/favicon.ico") ||
    request.nextUrl.pathname.match(/\.(png|jpg|jpeg|gif|svg)$/);

  if (!isConfigured && !isSetupPage && !isSetupApi && !isStaticAsset) {
    return NextResponse.redirect(new URL("/setup", request.url));
  }

  if (isConfigured && isSetupPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Info: (20260115 - Luphia) Match all request paths except for the ones starting with:
     * - api (API routes, except setup which is handled in middleware logic)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
