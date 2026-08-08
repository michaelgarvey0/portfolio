// Computes a signed token proving the LiveFlow gate was unlocked with the
// correct password. The signing secret never leaves the server, so a visitor
// can't just fabricate a valid cookie value — they'd need this exact HMAC,
// which only the server (given the secret) can produce.
const ENCODER = new TextEncoder();

export async function getLiveflowToken(): Promise<string> {
  const secret = process.env.LIVEFLOW_AUTH_SECRET;
  if (!secret) {
    throw new Error('LIVEFLOW_AUTH_SECRET is not set');
  }

  const key = await crypto.subtle.importKey(
    'raw',
    ENCODER.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', key, ENCODER.encode('liveflow-authed'));

  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}
