import { NextResponse } from 'next/server';
import { verifyAuthToken } from '@/lib/auth';

export function middleware(request) {
  const token = request.cookies.get('auth-token')?.value;
  
  // Check if user is trying to access protected routes
  if (request.nextUrl.pathname.startsWith('/dashboard') || 
      request.nextUrl.pathname.startsWith('/profile')) {
    
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    
    const user = verifyAuthToken(token);
    if (!user) {
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('auth-token');
      return response;
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*'], // Add your protected routes here
};
