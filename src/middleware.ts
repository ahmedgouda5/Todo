import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([     
  '/sign-up',      
  '/sign-in',
]);

export default clerkMiddleware((auth, req) => {
  const userId = auth().then(auth => auth.userId);

  if (!isPublicRoute(req) && !userId) {
    const signInUrl = new URL('/sign-in', req.url);
    signInUrl.searchParams.set('redirect_url', req.url);
    return NextResponse.redirect(signInUrl);
  }

  // كل شيء تمام
  return NextResponse.next();
});

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)',
    '/(api|trpc)(.*)',
  ],
};
