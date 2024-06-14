import { getUserFromCookies } from "@/actions/user.action";
import { NextRequest, NextResponse } from "next/server";

const middleware = async (req: NextRequest) => {
  const user = await getUserFromCookies();
  const url = req.nextUrl.clone();

  if (!user && url.pathname.startsWith("/dashboard")) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  const authRoutes = [
    "/login",
    "/register",
    "/reset-password",
    "/forgot-password",
  ];

  if (user && authRoutes.includes(url.pathname)) {
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
};

export default middleware;
