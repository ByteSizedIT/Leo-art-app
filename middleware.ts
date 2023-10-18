import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest, response: NextResponse) {
  const session = request.cookies.get("session");

  // return to login if no session cookie
  if (!session) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // call the authentication end point
  const responseAPI = await fetch(`${request.nextUrl.origin}/api/login`, {
    headers: { cookie: `session=${session?.value}` },
  });

  //Return to login if token not authorized
  if (responseAPI.status !== 200) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

// add protected routes
export const config = {
  matcher: ["/upload-artwork/:path*"],
};
