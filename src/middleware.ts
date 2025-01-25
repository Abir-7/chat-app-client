import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCurrentUser } from "./service/auth.service";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
  console.log(request.nextUrl.pathname);
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/:path/"],
};
