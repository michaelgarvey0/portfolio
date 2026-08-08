import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const authed = request.cookies.get('liveflow_auth')?.value === 'true';

  if (!authed) {
    const url = request.nextUrl.clone();
    url.pathname = '/liveflow-locked';
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/work/liveflow',
};
