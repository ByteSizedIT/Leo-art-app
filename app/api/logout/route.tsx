import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

// delete session cookie on client in response
export async function POST(request: NextRequest, response: NextResponse) {
  const options = {
    name: "session",
    value: "", // remove value
    maxAge: -1, // expire cookie
  };

  cookies().set(options);
  return NextResponse.json({}, { status: 200 });
}
