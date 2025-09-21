
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
// Update the import path if the file is named differently, e.g., Item_per_page.ts
import { routeAccessMap } from "./lib/Item_per_page";
import { NextResponse } from "next/server";

const matchers = Object.keys(routeAccessMap).map((route) => ({
  matcher: createRouteMatcher([route]),
  allowedRoles: routeAccessMap[route],
}));

console.log(matchers);

export default clerkMiddleware(async (auth, req) => {
  // if (isProtectedRoute(req)) auth().protect()

  const { sessionClaims } =await auth();
  console.log(sessionClaims);
  
  const role = (sessionClaims?.metadata as { role?: string })?.role;
  console.log(role);
  
  for (const { matcher, allowedRoles } of matchers) {
    if (matcher(req) && !allowedRoles.includes(role!)) {
      return NextResponse.redirect(new URL(`/dashboard/${role}`, req.url));
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
