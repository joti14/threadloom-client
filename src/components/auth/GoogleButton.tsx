"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { GoogleIcon } from "@/components/icons/GoogleIcon";
import { signIn } from "@/lib/auth-client";

export function GoogleButton({ callbackURL = "/" }: { callbackURL?: string }) {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    // Redirects to Google, then back to callbackURL on the frontend.
    await signIn.social({ provider: "google", callbackURL });
    setLoading(false);
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
