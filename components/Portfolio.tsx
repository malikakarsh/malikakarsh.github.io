import SiteLink from "./SiteLink";
import {
  homeContent,
  homeSections,
  HomeSectionKey,
  siteChrome,
} from "@/data/homepage";
import SiteHeader from "./SiteHeader";
import MiniTerminal from "./MiniTerminal";
import {
  Hero,
  FeaturedEngineering,
  Experience,
  SelectedProjects,
  Algorithms,
  EngineeringNotes,
  About,
  Education,
} from "./HomeSections";

// Explicit dispatch keeps each component's content props fully typed.
function renderSection(type: HomeSectionKey) {
  switch (type) {
    case "hero":
      return <Hero content={homeContent.hero} />;
    case "featured":
      return <FeaturedEngineering content={homeContent.featured} />;
    case "experience":
      return <Experience content={homeContent.experience} />;
    case "projects":
      return <SelectedProjects content={homeContent.projects} />;
    case "algorithms":
      return <Algorithms content={homeContent.algorithms} />;
    case "notes":
      return <EngineeringNotes content={homeContent.notes} />;
    case "education":
      return <Education content={homeContent.education} />;
    case "about":
      return <About content={homeContent.about} />;
  }
}
export default function Portfolio() {
  return (
    <>
      <SiteLink className="skip-link" href="#main">
        Skip to content
      </SiteLink>
      <SiteHeader />
      <main id="main" className="shell">
        {homeSections
          .filter((section) => section.enabled)
          .map((section) => (
            <div key={section.type}>{renderSection(section.type)}</div>
          ))}
        {siteChrome.terminal.enabled && (
          <MiniTerminal config={siteChrome.terminal} />
        )}
      </main>
      <footer className="shell site-footer">
        <div>
          <SiteLink
            className="wordmark"
            href="#home"
            aria-label="Akarsh Malik - Home"
          >
            am<span>.</span>
          </SiteLink>
          <p>{siteChrome.footer.tagline}</p>
        </div>
        <div className="footer-links">
          {siteChrome.footer.links.map((link) => (
            <SiteLink href={link.href} key={link.label}>
              {link.label}
            </SiteLink>
          ))}
        </div>
        <span className="mono">{siteChrome.footer.name}</span>
      </footer>
    </>
  );
}
