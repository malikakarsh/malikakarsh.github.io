import MobileNavigation from "./MobileNavigation";
import SiteLink from "./SiteLink";
import { siteChrome, homeContent, homeSections } from "@/data/homepage";
const enabledIds = new Set(
  homeSections
    .filter((section) => section.enabled)
    .map((section) => `#${homeContent[section.type].id}`),
);
const navigation = siteChrome.navigation.filter((item) =>
  enabledIds.has(item.href),
);

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <SiteLink
          className="wordmark"
          href="#home"
          aria-label="Akarsh Malik - Home"
        >
          am<span>.</span>
        </SiteLink>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <SiteLink key={item.href} href={item.href}>
              {item.label}
            </SiteLink>
          ))}
        </nav>
        <div className="header-socials">
          {siteChrome.socialLinks.map((link) => (
            <SiteLink href={link.href} key={link.label}>
              {link.label}
            </SiteLink>
          ))}
        </div>
        <MobileNavigation
          navigation={navigation}
          socialLinks={siteChrome.socialLinks}
        />
      </div>
    </header>
  );
}
