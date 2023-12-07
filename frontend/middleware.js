import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    if (
      req.nextUrl.pathname === "/create-user" &&
      req.nextauth.token?.role !== "admin"
    ) {
      return NextResponse.rewrite(new URL("/denied", req.url));
    }
  },
  {
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
      signIn: "/auth/sign-in",
    },
    callbacks: {
      // authorized: ({ token }) => token?.role === "admin",
      authorized: ({ token }) => !!token,
    },
    // Matches the pages config in `auth.ts => authOptions`
  }
);

// If you only want to secure certain pages, export a config object with a matcher
// export const config = { matcher: ["/protected", "/admin"] };
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|auth|favicon.ico).*)",
  ],
};
