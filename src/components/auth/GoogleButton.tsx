"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { GoogleIcon } from "@/components/icons/GoogleIcon";
import { signIn } from "@/lib/auth-client";
import { useToast } from "@/store/toast";

export function GoogleButton({ callbackURL = "/" }: { callbackURL?: string }) {
  const [loading, setLoading] = useState(false);
  const addToast = useToast((s) => s.addToast);

  async function handleClick() {
    setLoading(true);
    // callbackURL must be absolute so better-auth redirects back to the
    // frontend (not the backend root) after Google auth completes.
    const origin =
      typeof window !== "undefined" ? window.location.origin : "";
    const absoluteCallbackURL = callbackURL.startsWith("http")
      ? callbackURL
      : `${origin}${callbackURL}`;

    const { error } = await signIn.social({
      provider: "google",
      callbackURL: absoluteCallbackURL,
    });
    if (error) {
      addToast(error.message || "Failed to initiate Google login");
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full")}
    >
      <GoogleIcon className="size-4" />
      {loading ? "Redirecting..." : "Continue with Google"}
    </button>
  );
}
