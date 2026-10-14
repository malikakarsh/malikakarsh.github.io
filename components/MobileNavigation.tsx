"use client";
import { useRef } from "react";
import SiteLink from "./SiteLink";

export default function MobileNavigation({
  navigation,
  socialLinks,
}: {
  navigation: { label: string; href: string }[];
  socialLinks: { label: string; href: string }[];
}) {
  const menu = useRef<HTMLDetailsElement>(null);
  return (
    <details ref={menu} className="mobile-nav">
      <summary>
        Menu <span aria-hidden="true">＋</span>
      </summary>
      <nav
        aria-label="Mobile navigation"
        onClick={(event) => {
          if ((event.target as Element).closest("a") && menu.current)
            menu.current.open = false;
        }}
      >
        {[...navigation, ...socialLinks].map((link) => (
          <SiteLink href={link.href} key={link.label}>
            {link.label}
          </SiteLink>
        ))}
      </nav>
    </details>
  );
}
