import type { technicalActivities } from "@/data/activities";
import SiteLink from "./SiteLink";

export default function TechnicalActivities({
  content,
}: {
  content: typeof technicalActivities;
}) {
  return (
    <section
      className="student-organizations"
      aria-labelledby="student-organizations-title"
    >
      <h3 id="student-organizations-title" className="experience-subheading">
        {content.title}
      </h3>
      {content.entries.map((organization) => (
        <article
          className="student-organization"
          key={organization.organization}
        >
          <h4>
            <SiteLink href={organization.organizationUrl}>
              {organization.organization} · {organization.institution}
            </SiteLink>
          </h4>
          <p className="organization-meta">
            {organization.type} · {organization.dates}
          </p>
          <ul
            className="organization-responsibilities"
            aria-label="Leadership responsibilities"
          >
            {organization.responsibilities.map((responsibility) => (
              <li key={responsibility}>{responsibility}</li>
            ))}
          </ul>
          <p className="organization-description">{organization.description}</p>
          <p className="organization-metadata">
            {organization.technicalMetadata.join(" · ")}
          </p>
        </article>
      ))}
    </section>
  );
}
