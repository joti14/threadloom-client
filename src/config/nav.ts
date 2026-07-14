export const PUBLIC_NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const AUTHED_NAV_LINKS = [
  { href: "/items/add", label: "Add Item" },
  { href: "/items/manage", label: "Manage Items" },
] as const;
