"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { SITE_CONFIG } from "@/config/site";
import { PUBLIC_NAV_LINKS, AUTHED_NAV_LINKS } from "@/config/nav";
import { useSession, signOut } from "@/lib/auth-client";
import { CartLink } from "@/components/cart/CartLink";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { data: session, isPending } = useSession();
  const isLoggedIn = !!session;

  const links = isLoggedIn
    ? [...PUBLIC_NAV_LINKS, ...AUTHED_NAV_LINKS]
    : PUBLIC_NAV_LINKS;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          {SITE_CONFIG.name}
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <CartLink />
          {isPending ? null : isLoggedIn ? (
            <button
              type="button"
              onClick={() => signOut()}
              className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
            >
              Log out
            </button>
          ) : (
            <>
              <Link
                href="/login"
                className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
              >
                Log in
              </Link>
              <Link href="/register" className={cn(buttonVariants({ size: "sm" }))}>
                Sign up
              </Link>
            </>
          )}
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <CartLink />
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-foreground"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border px-4 pb-4 pt-2 md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2 text-sm font-medium text-foreground/80 hover:bg-muted hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="mt-3 flex flex-col gap-2 border-t border-border pt-3">
            {isLoggedIn ? (
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  signOut();
                }}
                className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
              >
                Log out
              </button>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
                >
                  Log in
                </Link>
                <Link
                  href="/register"
                  onClick={() => setOpen(false)}
                  className={cn(buttonVariants({ size: "sm" }))}
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
