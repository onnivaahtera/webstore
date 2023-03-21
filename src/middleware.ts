import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const session = await getToken({
    req: req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  if (req.nextUrl.pathname.startsWith("/account/admin")) {
    if (!session || session.role !== "Admin")
      return NextResponse.redirect(new URL("/account/login", req.url));
  }
  if (req.nextUrl.pathname.startsWith("/account/info")) {
    if (!session || session.role !== "Customer")
      return NextResponse.redirect(new URL("/account/login", req.url));
  }
  if (req.nextUrl.pathname.startsWith("/cart/checkout")) {
    if (!session)
      return NextResponse.redirect(new URL("/account/login", req.url));
  }
}
