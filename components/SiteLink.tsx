import type { ComponentProps } from "react";

export function isExternalWebsite(href: string) {
  const url = new URL(href, "https://malikakarsh.com");
  return (
    ["http:", "https:"].includes(url.protocol) &&
    !["malikakarsh.com", "www.malikakarsh.com"].includes(url.hostname)
  );
}

// One policy for navigation, content links, and future internal detail routes.
export default function SiteLink({
  href,
  children,
  indicator = true,
  ...props
}: ComponentProps<"a"> & { href: string; indicator?: boolean }) {
  const external = isExternalWebsite(href);
  return (
    <a
      {...props}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      {children}
      {external && indicator && (
        <>
          {" "}
          <span aria-hidden="true">↗</span>
        </>
      )}
    </a>
  );
}
