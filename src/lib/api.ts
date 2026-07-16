import axios from "axios";

export const api = axios.create({
  withCredentials: true,
});

// Set baseURL at request time so we can distinguish browser vs. SSR:
// - Browser  → relative URL, handled by the Next.js catch-all proxy at /api/*
//              The proxy forwards cookies, making session auth work correctly.
// - SSR      → absolute backend URL (no proxy, no session cookie needed for
//              server-side public data fetching).
api.interceptors.request.use((config) => {
  const isServer = typeof window === "undefined";
  if (isServer) {
    config.baseURL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";
  } else {
    // Relative base: browser resolves against current origin.
    // Requests go to threadloom-client.vercel.app/api/* → proxy → backend.
    config.baseURL = "";
  }
  return config;
});
