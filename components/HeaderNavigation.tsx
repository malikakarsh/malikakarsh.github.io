"use client";

import { useEffect, useState } from "react";
import MobileNavigation from "./MobileNavigation";
import SiteLink from "./SiteLink";

type NavigationLink = { href: string; label: string };

export default function HeaderNavigation({
  navigation,
  socialLinks,
}: {
  navigation: NavigationLink[];
  socialLinks: NavigationLink[];
}) {
  const [activeHref, setActiveHref] = useState<string>();

  useEffect(() => {
    const targets = navigation.map((link) => ({
      href: link.href,
    }));
    let frame = 0;
    const update = () => {
      frame = 0;
      const headerBottom =
        document.querySelector(".site-header")?.getBoundingClientRect().bottom ?? 0;
      const boundary = headerBottom + 80;
      let current: string | undefined;
      for (const target of targets) {
        const element = document.getElementById(target.href.slice(1));
        if (element && element.getBoundingClientRect().top <= boundary) {
          current = target.href;
        }
      }
      // The last section can be shorter than the viewport: select it at the page end.
      if (
        window.scrollY > 0 &&
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2
      ) {
        current = targets.at(-1)?.href;
      }
      setActiveHref(current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [navigation]);

  return (
    <>
      <nav className="desktop-nav" aria-label="Main navigation">
        {navigation.map((item) => (
          <SiteLink
            key={item.href}
            href={item.href}
            aria-current={activeHref === item.href ? "location" : undefined}
          >
            {item.label}
          </SiteLink>
        ))}
      </nav>
      <div className="header-socials">
        {socialLinks.map((link) => (
          <SiteLink href={link.href} key={link.label}>
            {link.label}
          </SiteLink>
        ))}
      </div>
      <MobileNavigation
        navigation={navigation}
        socialLinks={socialLinks}
        activeHref={activeHref}
      />
    </>
  );
}
