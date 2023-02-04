import { NextResponse, NextRequest } from "next/server";
// export { default } from "next-auth/middlewfare";
// import userStore from "./store";
export function middleware(req, res) {
  const request = new NextRequest(req);
  const refresh = req.cookies.get("refresh");
  if (refresh === undefined || refresh === null) {
    return NextResponse.redirect(new URL("/account/login", req.url));
  }
}

export const config = {
  matcher: "/post/:path*",
};
