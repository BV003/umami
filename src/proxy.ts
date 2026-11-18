import { type NextRequest, NextResponse } from 'next/server';

// Headless mode: only the tracker script and the API are reachable.
// Every UI page returns 404. Set ENABLE_UI=1 in Vercel to bring the UI back.
export function proxy(request: NextRequest) {
  if (process.env.ENABLE_UI) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  if (pathname === '/script.js' || pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  return new NextResponse('Not Found', { status: 404 });
}

export const config = {
  matcher: '/:path*',
};
