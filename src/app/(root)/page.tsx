import { SITE_CONFIG } from "@/config/site";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-2 px-6 text-center">
      <h1 className="text-3xl font-semibold">{SITE_CONFIG.name}</h1>
      <p className="text-muted-foreground">{SITE_CONFIG.tagline}</p>
    </main>
  );
}
