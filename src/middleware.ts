import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "./actions/user.action";

const middleware = async (req: NextRequest) => {
  const user = await currentUser();
  const url = req.nextUrl.clone();

  // redirect to login page if user is not authenticated
  if (!user && url.pathname.startsWith("/dashboard")) {
    // attach the current url to the login page
    const absoluteUrl = new URL(`/login?redirect=${url.pathname}`, req.url);

    return NextResponse.redirect(absoluteUrl);
  }

  // redirect to dashboard if user is authenticated

  // redirect to dashboard if user is authenticated
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

  // Check if the pathname matches /reset/:tokenid
  const match = url.pathname.match(/^\/reset\/([^/]+)$/);
  if (!user && match) {
    const token = match[1];
    const redirectUrl = new URL(`/reset-password`, req.url);
    redirectUrl.searchParams.set("token", token);

    return NextResponse.redirect(redirectUrl);
  }

  // Continue with the request if no match
  return NextResponse.next();
};

export default middleware;
