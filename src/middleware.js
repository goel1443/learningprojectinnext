import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('token');
  const path = request.nextUrl.pathname;

  // Allow access to login page and any public assets
  const isPublicPath = path === '/' || path === '/register';

  // If there's no auth token and it's not a public path, redirect to login
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // If there's an auth token and the path is /login, redirect to home
  if (token && isPublicPath) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Otherwise, continue with the request
  return NextResponse.next();
}

// This configuration will apply the middleware to all routes
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};