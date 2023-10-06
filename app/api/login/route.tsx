import { auth } from "firebase-admin";

import { customInitApp } from "@/firebase/firebase-admin-config";

import { NextRequest, NextResponse } from "next/server";
import { cookies, headers } from "next/headers";

// init the Firebase SDK every time the server is called
customInitApp();

// generate a session cookie in exchange for the provided ID token from firebase
export async function POST(request: NextRequest) {
  const authorization = headers().get("Authorization");
  //   console.log(authorization);
  if (authorization?.startsWith("Bearer ")) {
    const idToken = authorization.split("Bearer ")[1];
    const decodedToken = await auth().verifyIdToken(idToken);

    if (decodedToken) {
      // generate session cookie
      const expiresIn = 60 * 60 * 24 * 5 * 1000; // expiration set to 5 days
      // the session cookie will have the same claims as the ID token
      const sessionCookie = await auth().createSessionCookie(idToken, {
        expiresIn,
      });
      // set cookie policy for session cookie
      const options = {
        name: "session",
        value: sessionCookie,
        maxAge: expiresIn,
        httpOnly: true,
        secure: true,
        SameSite: "strict", // ???
      };

      // add the cookie to the browser
      cookies().set(options);
    }
  }

  return NextResponse.json({}, { status: 200 });
}

export async function GET(request: NextRequest, response: NextResponse) {
  const session = cookies().get("session")?.value || "";

  // validate if the cookie exists in the request
  if (!session) {
    return NextResponse.json({ isLogged: false }, { status: 401 });
  }

  // use Firebase Admin to validate the session cookie
  const decodedClaims = await auth().verifySessionCookie(session, true);

  if (!decodedClaims)
    return NextResponse.json({ isLogged: false }, { status: 401 });

  return NextResponse.json({ isLogged: true }, { status: 200 });
}
