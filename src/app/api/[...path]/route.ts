/**
 * Catch-all API proxy route.
 *
 * Every request to /api/* from the browser is forwarded here by Next.js.
 * We proxy it to the real backend and—critically—forward ALL response
 * headers including `Set-Cookie`.  This keeps auth cookies on the
 * same origin (threadloom-client.vercel.app) so the browser stores and
 * sends them correctly on every subsequent request, including the
 * OAuth callback.  This eliminates the state_mismatch error.
 */
import { type NextRequest } from "next/server";

const BACKEND = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

async function proxyRequest(req: NextRequest): Promise<Response> {
  const { pathname, search } = new URL(req.url);
  const targetUrl = `${BACKEND}${pathname}${search}`;

  // Forward all request headers, but fix the host to match the backend.
  const reqHeaders = new Headers(req.headers);
  const originalHost = new URL(req.url).host;
  reqHeaders.set("host", new URL(BACKEND).host);
  reqHeaders.set("x-forwarded-host", originalHost);
  reqHeaders.set("x-forwarded-proto", "https");
  
  // Explicitly ensure the cookie header is forwarded
  if (req.headers.has("cookie")) {
    reqHeaders.set("cookie", req.headers.get("cookie") as string);
  }

  // Strip hop-by-hop headers that can't be forwarded.
  reqHeaders.delete("connection");
  reqHeaders.delete("keep-alive");
  reqHeaders.delete("transfer-encoding");

  console.log(`[PROXY] -> ${req.method} ${targetUrl}`);
  console.log(`[PROXY] Incoming Cookie:`, req.headers.get("cookie"));
  console.log(`[PROXY] Forwarded Cookie:`, reqHeaders.get("cookie"));

  const hasBody = req.method !== "GET" && req.method !== "HEAD";

  const backendResponse = await fetch(targetUrl, {
    method: req.method,
    headers: reqHeaders,
    body: hasBody ? req.body : undefined,
    // Don't follow redirects — let the browser handle them so it
    // stores session cookies correctly.
    redirect: "manual",
    // Required for streaming request bodies in Node.js 18+.
    // @ts-expect-error — not yet in TS lib, but valid in Node.js 18+
    duplex: "half",
  });

  // Build the response headers, carefully preserving multiple Set-Cookie
  // values (browsers require separate headers for each cookie).
  const respHeaders = new Headers();

  // getSetCookie() is available in Node.js 20+ / undici
  const cookies: string[] =
    typeof (backendResponse.headers as any).getSetCookie === "function"
      ? (backendResponse.headers as any).getSetCookie()
      : [];

  backendResponse.headers.forEach((value, key) => {
    if (key.toLowerCase() !== "set-cookie") {
      respHeaders.set(key, value);
    }
  });

  for (const cookie of cookies) {
    respHeaders.append("set-cookie", cookie);
  }

  return new Response(backendResponse.body, {
    status: backendResponse.status,
    statusText: backendResponse.statusText,
    headers: respHeaders,
  });
}

export const GET = proxyRequest;
export const POST = proxyRequest;
export const PUT = proxyRequest;
export const DELETE = proxyRequest;
export const PATCH = proxyRequest;
export const OPTIONS = proxyRequest;
