"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "@/lib/auth-client";

/**
 * Guards a page's content behind an active session. While the session is
 * resolving, shows a lightweight placeholder; if there's no session, redirects
 * to /login with a ?redirect= back to the current page. Better Auth's
 * useSession() is the single source of truth for the current user.
 */
export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (!isPending && !session) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [isPending, session, router, pathname]);

  if (isPending) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-7xl items-center justify-center px-4">
        <div className="size-6 animate-spin rounded-full border-2 border-muted border-t-foreground" />
      </div>
    );
  }

  if (!session) {
    // Redirect is in-flight from the effect; render nothing meanwhile.
    return null;
  }

  return <>{children}</>;
}
