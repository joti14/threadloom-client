"use client";

import { useState, type FormEvent } from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!EMAIL_PATTERN.test(email)) {
      setStatus("error");
      return;
    }
    setStatus("success");
    setEmail("");
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center gap-6 rounded-2xl bg-secondary px-6 py-12 text-center">
        <h2 className="text-2xl font-semibold sm:text-3xl">
          Get first access to new drops
        </h2>
        <p className="max-w-md text-sm text-muted-foreground">
          Join the list for early access to new arrivals and the occasional
          discount. No spam, unsubscribe anytime.
        </p>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="flex w-full max-w-md flex-col gap-2 sm:flex-row"
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status !== "idle") setStatus("idle");
            }}
            placeholder="you@example.com"
            className="h-10 flex-1 rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          />
          <button
            type="submit"
            className={cn(buttonVariants({ size: "default" }), "bg-brand text-brand-foreground hover:bg-brand/90")}
          >
            Subscribe
          </button>
        </form>

        {status === "success" && (
          <p className="text-sm font-medium text-brand">
            You&apos;re on the list — check your inbox to confirm.
          </p>
        )}
        {status === "error" && (
          <p className="text-sm font-medium text-destructive">
            Please enter a valid email address.
          </p>
        )}
      </div>
    </section>
  );
}
