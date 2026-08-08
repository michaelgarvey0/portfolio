import { NextRequest, NextResponse } from 'next/server';
import { getLiveflowToken } from '@/lib/liveflowAuth';

export async function POST(request: NextRequest) {
  const { password } = await request.json();

  if (!password || password !== process.env.LIVEFLOW_PASSWORD) {
    return NextResponse.json({ success: false }, { status: 401 });
  }

  const token = await getLiveflowToken();

  const response = NextResponse.json({ success: true });
  response.cookies.set('liveflow_auth', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: '/',
  });
  return response;
}
