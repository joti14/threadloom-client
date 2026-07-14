import { SITE_CONFIG } from "@/config/site";

export default function Home() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-2 px-6 text-center">
      <h1 className="text-3xl font-semibold">{SITE_CONFIG.name}</h1>
      <p className="text-muted-foreground">{SITE_CONFIG.tagline}</p>
    </div>
  );
}
