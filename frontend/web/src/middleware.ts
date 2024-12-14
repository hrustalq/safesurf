import createMiddleware from 'next-intl/middleware';
import { auth } from "@/auth";
import { routing } from './i18n/routing';

// Create the i18n middleware
const i18nMiddleware = createMiddleware(routing);

// Combine both middlewares
export default auth((req) => {
  // Handle i18n after authentication
  return i18nMiddleware(req);
});

// Configure protected routes
export const config = {
  // Skip all internal paths except auth
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)', '/(ru|en)/:path*']
};
