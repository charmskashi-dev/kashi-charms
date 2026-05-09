import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// ✅ Only these routes require login
const isProtectedRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/orders(.*)",
  "/account(.*)",
  "/admin(.*)",
  "/dashboard(.*)",
  "/success(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|.*\\..*).*)",
    "/",
    "/(api|trpc)(.*)",
  ],
};