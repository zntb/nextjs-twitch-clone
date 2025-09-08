// middleware.ts (at repo root or /src)
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher([
  '/', // home
  '/sign-in(.*)', // auth pages
  '/sign-up(.*)',
  '/search',
  '/api/webhooks(.*)', // public webhooks
  '/api/uploadthing', // uploads endpoint (public if you expect unauthenticated)
]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

// This matcher is Clerk’s recommended default for App Router
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
