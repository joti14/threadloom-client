import Link from "next/link";
import { Instagram, Twitter, Facebook } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

const SHOP_LINKS = [
  { href: "/products?category=men", label: "Men" },
  { href: "/products?category=women", label: "Women" },
  { href: "/products?category=kids", label: "Kids" },
  { href: "/products?category=footwear", label: "Footwear" },
  { href: "/products?category=accessories", label: "Accessories" },
];

const COMPANY_LINKS = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/help", label: "Help & Support" },
  { href: "/privacy", label: "Privacy & Terms" },
];

const SOCIAL_LINKS = [
  { href: SITE_CONFIG.social.instagram, label: "Instagram", Icon: Instagram },
  { href: SITE_CONFIG.social.x, label: "X", Icon: Twitter },
  { href: SITE_CONFIG.social.facebook, label: "Facebook", Icon: Facebook },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border bg-secondary">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-12 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="col-span-2 md:col-span-1">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            {SITE_CONFIG.name}
          </Link>
          <p className="mt-3 text-sm text-muted-foreground">{SITE_CONFIG.tagline}</p>
          <div className="mt-4 flex items-center gap-4">
            {SOCIAL_LINKS.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <Icon className="size-5" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Shop</h3>
          <ul className="mt-4 space-y-2">
            {SHOP_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Company</h3>
          <ul className="mt-4 space-y-2">
            {COMPANY_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Customer Care</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>
              <a
                href={`mailto:${SITE_CONFIG.contactEmail}`}
                className="transition-colors hover:text-foreground"
              >
                {SITE_CONFIG.contactEmail}
              </a>
            </li>
            <li>Mon–Fri, 9am–6pm</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border px-4 py-6 sm:px-6 lg:px-8">
        <p className="text-center text-xs text-muted-foreground">
          © {year} {SITE_CONFIG.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
