import ExternalArrow from "./ExternalArrow";
import TechnicalActivities from "./TechnicalActivities";
import BenchmarkGrid from "./BenchmarkGrid";
import SiteLink from "./SiteLink";
import Image from "next/image";
import type { CSSProperties } from "react";
import { homeContent, HomeSectionKey } from "@/data/homepage";
import { links } from "@/data/portfolio";
import BenchmarkFigure from "./BenchmarkFigure";
import HeroBackground from "./HeroBackground";
import { heroVariant } from "@/data/hero-variant";

type Content<K extends HomeSectionKey> = (typeof homeContent)[K];
function SectionHeading({
  id,
  number,
  label,
  title,
  description,
  anchor = true,
}: {
  id: string;
  number: string;
  label: string;
  title: string;
  description?: string;
  anchor?: boolean;
}) {
  return (
    <div className="section-heading" id={anchor ? id : undefined}>
      <p className="eyebrow">
        <span>{number} /</span> {label}
      </p>
      <h2 id={`${id}-title`}>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}
function Tags({ items }: { items: readonly string[] }) {
  return (
    <ul className="tags" aria-label="Technologies">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
function ProjectRow({
  project,
  index,
}: {
  project: {
    title: string;
    desc: string;
    tech: readonly string[];
    link: string;
  };
  index: number;
}) {
  return (
    <article className="project-row">
      <span className="project-number">{String(index).padStart(2, "0")}</span>
      <div>
        <h3>
          <SiteLink href={project.link}>{project.title}</SiteLink>
        </h3>
        <p>{project.desc}</p>
        <Tags items={project.tech} />
      </div>
    </article>
  );
}
export function Hero({ content: c }: { content: Content<"hero"> }) {
  return (
    <section className="hero" id={c.id} aria-labelledby={`${c.id}-title`} data-hero-variant={heroVariant}>
      <HeroBackground variant={heroVariant} />
      <div className="hero-topline">
        <p className="eyebrow">
          {c.name} <span>{c.role}</span>
        </p>
        <SiteLink className="availability" href={links.email}>
          <span />
          {c.availability}
        </SiteLink>
      </div>
      <div className="hero-grid">
        <div className="hero-copy">
          <h1 id={`${c.id}-title`}>{c.headline}</h1>
          <p className="hero-direction">
            {c.direction.map((text, index) => (
              <span className="direction-item" key={text}>
                {index > 0 && <span aria-hidden="true">·</span>}
                {text}
              </span>
            ))}
          </p>
          <p className="hero-description">{c.description}</p>
          <p className="hero-location">
            {c.education} <span>/</span> {c.location}
          </p>
          <div className="hero-actions">
            <SiteLink className="button button-primary" href={c.cta.href}>
              {c.cta.label} <span aria-hidden="true">↓</span>
            </SiteLink>
            <SiteLink className="text-link" href={links.github}>
              GitHub
            </SiteLink>
          </div>
        </div>
        <div className="hero-performance">
          <BenchmarkGrid />
          <div className="performance-project">
            <h2>{c.performance.title}</h2>
            <p>{c.performance.subtitle}</p>
          </div>
          <BenchmarkFigure benchmark={c.performance.benchmark} />
        </div>
      </div>
      <div className="credibility" aria-label="Profile highlights">
        {c.metrics.map((metric) => (
          <SiteLink href={metric.href} key={metric.label}>
            <strong className={metric.value.length > 10 ? "metric-focus" : ""}>
              {metric.value} {metric.suffix && <span>{metric.suffix}</span>}
            </strong>
            <p>{metric.label}</p>
          </SiteLink>
        ))}
      </div>
    </section>
  );
}
export function FeaturedEngineering({
  content: c,
}: {
  content: Content<"featured">;
}) {
  return (
    <section
      className="section featured-section"
      aria-labelledby={`${c.id}-title`}
    >
      <div className="featured-grid" id="fastinfer">
        <div className="featured-left">
          <SectionHeading {...c} />
          <div className="featured-copy">
          <p className="project-kicker">
            <span className="small-square" />
            {c.kicker}
          </p>
          <h3>{c.project.title}</h3>
          <p className="featured-description">{c.project.description}</p>
          <p className="featured-description">{c.project.evaluation}</p>
          <Tags items={c.project.technologies} />
          <div className="engineering-principles">
            {c.principles.map((principle, index) => (
              <div key={principle.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>
                  <strong>{principle.title}</strong> {principle.description}
                </p>
              </div>
            ))}
          </div>
          <SiteLink className="text-link" href={c.project.link}>
            {c.cta}
          </SiteLink>
          <SiteLink
            className="text-link project-notes-link"
            href={c.project.notes.href}
          >
            {c.project.notes.label}
          </SiteLink>
          </div>
        </div>
        <BenchmarkFigure benchmark={c.project.decodeBenchmark} />
      </div>
    </section>
  );
}
export function Experience({ content: c }: { content: Content<"experience"> }) {
  return (
    <section className="section" aria-labelledby={`${c.id}-title`}>
      <div className="experience-layout" id={c.id}>
        <div className="experience-rail">
          <SectionHeading {...c} anchor={false} />
          <div className="experience-glance">
            <p className="eyebrow">{c.glance.title}</p>
            <dl>
              {c.glance.items.map((item) => (
                <div key={item.label}>
                  <dt>{item.label}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
        <div className="experience-list">
          <section
            className="professional-experience"
            aria-labelledby="professional-experience-title"
          >
            <h3
              id="professional-experience-title"
              className="experience-subheading"
            >
              {c.professionalTitle}
            </h3>
            {c.entries.map((job, index) => (
              <article
                className="experience-entry"
                key={`${job.company}-${job.role}`}
              >
                <div className="experience-marker" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className="experience-content">
                  <div className="experience-top">
                    <p className="eyebrow company">
                      {job.companyUrl ? (
                        <SiteLink href={job.companyUrl}>{job.company}</SiteLink>
                      ) : (
                        job.company
                      )}
                    </p>
                    <span className="employment-type">
                      {job.type.toUpperCase()}
                    </span>
                  </div>
                  <h4>{job.role}</h4>
                  <p className="job-date">
                    {job.duration}
                    {job.location && ` / ${job.location}`}
                  </p>
                  {job.description && (
                    <p className="job-description">{job.description}</p>
                  )}
                  {job.bullets.length > 0 && (
                    <ul className="job-bullets">
                      {job.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                  {job.technologies.length > 0 && (
                    <Tags items={job.technologies} />
                  )}
                </div>
              </article>
            ))}
          </section>
          <TechnicalActivities content={c.studentOrganizations} />
        </div>
      </div>
    </section>
  );
}
export function SelectedProjects({
  content: c,
}: {
  content: Content<"projects">;
}) {
  return (
    <section className="section" aria-labelledby={`${c.id}-title`}>
      <div className="projects-heading">
        <SectionHeading {...c} />
      </div>
      <div>
        {c.entries.map((project, index) => (
          <ProjectRow key={project.title} project={project} index={index + 1} />
        ))}
      </div>
      <SiteLink className="text-link more-projects-link" href={c.cta.href}>
        {c.cta.label}
      </SiteLink>
    </section>
  );
}
export function Algorithms({ content: c }: { content: Content<"algorithms"> }) {
  return (
    <section className="algorithms section" aria-labelledby={`${c.id}-title`}>
      <div>
        <SectionHeading {...c} />
        <p className="algorithm-topics">{c.topics.join(" / ")}</p>
        <SiteLink className="text-link" href={c.cta.href}>
          {c.cta.label}
        </SiteLink>
      </div>
      <div className="rating-panel">
        <div className="knight-label">
          <span
            className="knight-emblem"
            style={{ "--knight-mask": `url("${c.badge}")` } as CSSProperties}
          >
            <span className="knight-emblem-surface">
              <Image
                src={c.badge}
                alt=""
                width={56}
                height={56}
                className="knight-emblem-image"
              />
              <span className="knight-reflection" aria-hidden="true" />
            </span>
          </span>
          <span>{c.rank}</span>
        </div>
        <strong>{c.rating}</strong>
        <p className="eyebrow">{c.ratingLabel}</p>
        <p className="rating-ranking">{c.ranking}</p>
      </div>
    </section>
  );
}
export function EngineeringNotes({
  content: c,
}: {
  content: Content<"notes">;
}) {
  return (
    <section
      className="section notes-section"
      aria-labelledby={`${c.id}-title`}
    >
      <SectionHeading {...c} />
      {c.entries.map((note) => (
        <div className="notes-preview" key={note.title}>
          <span className="note-glyph" aria-hidden="true">
            <ExternalArrow />
          </span>
          <div>
            <h3>{note.title}</h3>
            <p>{note.description}</p>
            <SiteLink className="text-link" href={note.cta.href}>
              {note.cta.label}
            </SiteLink>
          </div>
          <span className="eyebrow notes-format">
            {note.tags.join(" / ").toUpperCase()}
          </span>
        </div>
      ))}
    </section>
  );
}
export function About({ content: c }: { content: Content<"about"> }) {
  return (
    <section
      className="section about-section"
      aria-labelledby={`${c.id}-title`}
    >
      <div className="about-grid">
        <div className="portrait-wrap">
          <Image
            src={c.photo.src}
            alt={c.photo.alt}
            width={640}
            height={640}
            sizes="(max-width: 700px) 90vw, 360px"
            className="portrait"
          />
          <p className="eyebrow">{c.photo.caption}</p>
        </div>
        <div>
          <SectionHeading {...c} />
          {c.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <div className="off-clock">
            <span className="eyebrow">{c.offClock.label}</span>
            <p>
              {c.offClock.lines.map((line) => (
                <span className="off-clock-line" key={line}>
                  {line}
                </span>
              ))}
            </p>
          </div>
          <SiteLink className="text-link" href={c.cta.href}>
            {c.cta.label}
          </SiteLink>
        </div>
      </div>
    </section>
  );
}

export function Education({ content: c }: { content: Content<"education"> }) {
  return (
    <section
      className="section education-section"
      aria-labelledby={`${c.id}-title`}
    >
      <div className="background-grid education-columns">
        <div>
          <SectionHeading {...c} />
          <div className="education-details">
            {c.education.map((education) => (
              <article className="education-entry" key={education.university}>
                <h3>{education.university}</h3>
                <p>{education.degree}</p>
                <p className="mono">
                  {education.duration} · GPA {education.gpa}
                </p>
                <p className="coursework">{education.coursework.join(" / ")}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="skills">
          <h3 className="eyebrow">{c.skillsLabel}</h3>
          {c.skills.map((stack) => (
            <div
              className={`skill-group${stack.featured ? " skill-group-featured" : ""}`}
              key={stack.category}
            >
              <h4>{stack.category}</h4>
              <p>
                {stack.items.map((skill, index) => (
                  <span key={skill}>
                    {index > 0 && " / "}
                    {skill}
                  </span>
                ))}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
