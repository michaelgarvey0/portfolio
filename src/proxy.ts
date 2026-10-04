import { NextRequest, NextResponse } from 'next/server';
import { getLiveflowToken } from '@/lib/liveflowAuth';

// Magic-link unlock only - /work/liveflow?pw=... sets the cookie and redirects
// to the clean URL (same page, no query string). If there's no ?pw= or it's
// wrong, this does nothing and the request passes through untouched - the
// layout's own gate handles showing the password prompt in place.
export async function proxy(request: NextRequest) {
  const pw = request.nextUrl.searchParams.get('pw');

  if (pw && pw === process.env.LIVEFLOW_PASSWORD) {
    const token = await getLiveflowToken();
    const url = request.nextUrl.clone();
    url.searchParams.delete('pw');

    const response = NextResponse.redirect(url);
    response.cookies.set('liveflow_auth', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
    });
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/work/liveflow',
};
