import { createAuthClient } from "better-auth/react";

// NEXT_PUBLIC_APP_URL is the frontend's own URL (e.g. https://threadloom-client.vercel.app).
// By pointing the auth client at the frontend origin, every /api/auth/* request
// goes through the Next.js proxy as a same-origin request, so the browser can
// store and send the OAuth state cookie without any cross-origin cookie issues.
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export const authClient = createAuthClient({
  baseURL: APP_URL,
});

export const { useSession, signIn, signOut, signUp } = authClient;
