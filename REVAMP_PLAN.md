# Portfolio v2 revamp plan

## Audit
- Next.js 16.2.4 / React 19.2.4, App Router. `/` is the only existing page.
- Tailwind 4, Geist Sans / Geist Mono through `next/font`. Content currently lives in `components/Portfolio.tsx`.
- Client-rendered tabbed dashboard, Framer Motion entrance animations, continuous canvas particles, and viewport scaling.
- `output: 'export'`; GitHub Pages workflow builds `out/` and deploys on `dev` pushes. Preserve this deployment configuration and work locally on `v2`.
- Existing content: AB InBev Data Scientist (Aug 2023–Aug 2025), AB InBev Data Analyst Intern (Jun–Jul 2022), Quantale Full Stack Intern (Sep–Nov 2021); six projects; both degrees, coursework and GPAs; language/technology groups; running/hiking; LeetCode Knight and peak 1963; photo, email, GitHub and LinkedIn URLs.
- Local main matched origin/main after fetch; v2 created from that revision. Existing untracked spec.md preserved.

## Reuse / replacement
Reuse Next.js, static export, fonts, photo and Knight assets, verified content and links. Extract all legacy content into a data module before replacing the homepage.
Replace the tabbed Sidebar / card dashboard, FitToScreen, particles and animation dependency in the active homepage with semantic server-rendered sections and CSS. Keep old standalone components available during review.

## Proposed component tree
RootLayout → SiteHeader → Portfolio → Hero / CredibilityStrip / FeaturedEngineering / Experience / SelectedProjects / Algorithms / EngineeringNotesPreview / AboutAndBackground → SiteFooter.
Shared primitives: SectionHeading, Tags, ProjectRow, BenchmarkFigure. Small optional client component: MiniTerminal.

## Routes and review gate
First implement `/` only, including responsive foundations and metadata. The user will review the homepage before any project detail or notes pages are built. Do not publish or change the existing deployment trigger.
After approval: `/projects/fastinfer`, `/projects/[slug]`, `/notes`, `/notes/[slug]`; use generated static params and await route params per installed Next.js docs.

## Content evidence / TODOs
- FastInfer verified against https://github.com/malikakarsh/fastInfer README, fetched 2026-10-13. Feature the real Qwen up_proj isolated projection ranges (116.56–116.60 µs vs 99.14–99.30 µs), with hardware, precision, graph-timing scope, and no whole-model speedup claim.
- Separate inference repository currently named Transformer-GPU-Kernel-Optimization (old LLM-Inference URL redirects). Preserve as a separate project with the repository's actual notebook scope.
- Resume functionality intentionally removed at the user’s request; do not restore links, downloads, request buttons or terminal commands.
- TODO: obtain accomplishment bullets, per-role technologies and locations for all three jobs; the old site contains titles/dates only. Preserve roles and employment types without inventing duties. This prevents final experience acceptance until source material is supplied.
- No verified problems-solved count; omit it. Existing ranking/contest statistics retained in source but avoid presenting volatile values as current.
- TODO after homepage approval: import legitimate FastInfer notes with accurate publication dates; do not publish invented articles.

## Validation
Run production build, TypeScript and lint. Verify the homepage at 375, 430, tablet, desktop and large desktop if browser tooling is available; test links, mobile menu, terminal keyboard interaction, focus, contrast and reduced motion. Record verification limitations honestly.

## Homepage review implementation
+- `data/homepage.ts`: all section headings, copy, metrics, section order and visibility (`homeSections`), navbar and footer configuration. Sections are injected into reusable, typed renderers in `components/HomeSections.tsx`.
+- `data/portfolio.ts`: preserved original professional roles, education, technology groups and external links.
+- `data/projects.ts`: separate FastInfer and Transformer GPU Kernel Optimization objects, existing projects, and explicitly scoped benchmark data.
+- User requested a refinement: replaced abstract slogans with descriptive headings, removed the decorative matrix/notebook panel, and disabled the optional terminal by default. Hero now shows the actual GEMV projection benchmark; featured project shows the RMSNorm mean-candidate cached-decode repeat (France, 32.990 → 31.402 ms/step, 4.8% lower median latency).
+- Both benchmark summaries verified against FastInfer's saved JSON files. The decode baseline is uncompiled FP16 with math SDPA; prefill excluded; logit/token agreement reported for tested inputs only. Source links are displayed next to the measurements.
+- Real portrait optimized to WebP (469 KB → 60 KB); original retained. Added homepage canonical, OpenGraph and Twitter metadata with a generated social card.
+- Final production static-export build, TypeScript, and ESLint passed.
+- Chrome checked 375, 430, 768, 1280 and 1920 px: no horizontal overflow, broken images, missing anchor targets, browser errors, or automated axe accessibility violations. Mobile menu and Experience anchor navigation passed. Verified all three roles, both internship labels, 2 years, NYU, 1963/Knight and real photo in the rendered DOM.
+- Browser tests used a temporary standalone Chrome setup because the in-app Browser JavaScript execution tool was unavailable. Automated accessibility checks do not substitute for a complete manual accessibility audit.
+- Homepage is ready for user review at http://127.0.0.1:3000. Project detail and local notes routes remain deferred until approval, as requested.

## Identity refinement
- Removed resume functionality from desktop/mobile navigation, hero, shared links and optional terminal.
- Navbar remains Selected Projects / Experience / Technical Notes / About with GitHub and LinkedIn at the right.
- Identity: Software Engineer · ML Systems & Agentic AI; headline remains GPU Kernels and LLM Inference Systems.
- Agentic AI is grounded in UrbanIntel’s documented LangGraph/LangChain agent workflows. Role-specific Agentic AI accomplishments remain pending verified job details; do not attribute project work to an employer.

## Homepage notes visibility
- Disabled the Technical Notes homepage section through `homeSections` and removed its navigation item. Preserved its content and renderer for future standalone articles; no local /notes routes had been implemented yet.
- Moved the existing repository notes link into FastInfer as “Implementation & benchmark notes ↗”. No replacement section added.

## Final hero refinement
- Headline now “ML Systems, GPU Kernels & LLM Inference”; broader software engineer / ML systems / agentic AI identity retained.
- Hero card width retained at approximately 495 px on the tested desktops. Increased internal spacing by 44 px (approximately 10% taller), without increasing text sizes or adding content.
- Replaced per-input debug rows with “Measured across 3 captured decode inputs.” Removed prompt names from both homepage benchmarks; full evidence remains linked.
- Speedup is the strongest card element; faint neutral matrix grid remains background-only. Improved supporting typography and About photo caption.
- Reduced outer hero spacing: full credibility strip ends at approximately y=759 px on 1440×900 and 1366×768, and y=759 px on 1280×800. Headline remains two lines at all three laptop sizes.
- Production build, TypeScript, ESLint passed. Six viewport checks found no horizontal overflow or automated axe violations. Mobile layout stacks without trying to fit the entire stacked hero into one screen.

## Current navigation, project content, and benchmark treatment
- Navbar: Work / Experience / Algorithms / About; GitHub and LinkedIn remain text links. Logo is a keyboard-accessible Home anchor. All third-party web links use the shared `SiteLink` with `_blank` and `noopener noreferrer`; only external links show ↗. Email and internal anchors stay in the current tab.
- Section order: Hero / credibility / FastInfer / selected projects / experience / algorithms / About. Technical Notes stays disabled, with its repository link in FastInfer.
- FastInfer introduction now explains the experimental project and the question of translating microbenchmark gains into model-level performance, followed by implementation, correctness, and integration details.
- Anchor IDs live on heading wrappers, not padded sections. One CSS offset uses navbar height + 60 px, with the proper desktop/mobile height; duplicate Work ID removed. Direct hashes and clicks verified at approximately 60 px below the sticky header. Natural section spacing preserved.
- Current benchmark decoration is ambient-only: three diffuse green regions under a fixed full-card grid, CSS transforms on 34–53 second cycles with different phases per card. All visible flow paths, trails, cell blocks and SVG motion were removed. Triton bar highlight runs briefly every 10 / 11.5 seconds. Reduced-motion/mobile views keep static illumination and the grid.
- Featured artifact now measures about 484 × 648 px at laptop widths, with greater spacing and a readable saved-latency annotation. `32.990 - 31.402 = 1.588 ms/step`; bars and the dashed saved region use the true approximately 4.8136% difference, with no exaggerated scale.
- Latest production build, TypeScript, ESLint and diff check passed. Browser checks at 1440×900, 1366×768, 375×900 and 430×900 found no overflow or automated axe violations. Credibility strip remains fully visible on tested laptops; all four direct URL anchors retain the 60 px offset. Preview remains running for user review; no publication or push.

## Current projects, education, skills and student activity
- Homepage now showcases only FastInfer, Transformer GPU Kernel Optimization, and UrbanIntel. Removed the project archive from the homepage; other original project records remain in source. Selected Projects ends with one external “More projects on GitHub” link.
- NYU: M.S. Computer Science, Sep 2025–May 2027, GPA 3.88/4; coursework updated to Deep Learning / Machine Learning / Operating Systems / Design and Analysis of Algorithms. NIT education retained.
- `data/skills.ts` contains exactly the four supplied resume categories and skills. ML / AI Systems receives subtle typographic emphasis, especially PyTorch, Triton and LLMs; no skill badges or invented additions.
- `data/activities.ts` and `TechnicalActivities` add a compact section under Education: Delta Force · NIT Trichy, Developer, Sep 2020–May 2023, explicitly labeled Student technical organization. The supplied AES/RSA, Kubernetes and server-security work is summarized. Existing source does not verify a team-lead title or exact CTF-Time achievement; neither is claimed.
- Professional Experience remains exactly the three AB InBev / Quantale roles; professional experience remains 2 years. Student activity never enters the employment data or metric.
- Final build, ESLint, TypeScript and diff checks pass. Rendered content and desktop/tablet/mobile layouts checked at 1440, 768, 375 and 430 px: no overflow or automated axe violations; new project, education, skill and student-activity content matches the supplied information.

## Final project and Experience corrections
- FastInfer remains standalone; Selected Projects is exactly Transformer GPU Kernel Optimization / Weave / Snatch, followed by More projects on GitHub. Snatch's real-time Dutch/English auction description and TypeScript language are grounded in its public GitHub repository metadata. SnapIndex references removed; UrbanIntel remains in source but is not featured.
- Experience right column has Professional Experience (the original three roles, in their chronological order) followed by a separate compact Student Leadership block. Delta Force never enters the employment list or the 2-year metric, and is no longer under Education.
- Student Leadership: linked Delta Force · NIT Trichy; Student Technical Organization · Sep 2020–May 2023; three compact responsibilities; one description sentence; Open Source / CTF / Security / AES/RSA / Kubernetes metadata. No artificial Developer & Technical Leadership title or employment badge. Desktop block measures approximately 159 px versus 472 px for Professional Experience.
- Em dashes in website text, metadata, and accessibility labels replaced with normal hyphens.
- Latest component build, ESLint, TypeScript and responsive checks pass. Desktop/tablet/mobile checks found no overflow or automated axe violations. All professional role labels, external Delta link and 2-year metric preserved.


### Education, rank hierarchy, and featured alignment refinement
- Education is now its own configurable major section after About, headed 06 / EDUCATION and Education. The academic details and Technical Skills retain their two-column layout. Navigation order: Work, Experience, Algorithms, About, Education.
- Education heading hash/click positioning verified at approximately 60px below the navbar at desktop, tablet, and mobile widths.
- Knight badge reduced to 56px desktop / 52px mobile, preserving tilt and reflection with a quieter halo and hover scale. User-supplied Top 3.22% worldwide added below the peak-rating label; left Algorithms copy unchanged.
- Featured benchmark card receives a desktop-only 24px upward optical adjustment; width, height, internal spacing, benchmark data and animation remain unchanged.
- Responsive and axe checks passed at 1440, 1366, 1024, 768, 430 and 375px; reduced motion preserves static badge and glow treatment.

- Education/Technical Skills use equal top-aligned columns. Skills label has no inherited heading offset. All individual technology names use consistent plain text; only the ML / AI Systems category heading and accent line remain emphasized.

- Experience right-hand subsection is aligned to the main Experience title band rather than the small section kicker. Current source previously aligned the right title with the kicker; adjusted desktop/tablet list offset without changing entry spacing or mobile stacking.

### Final section-label alignment and favicon
- Featured Project structurally places the section header plus FastInfer copy in the left column, with the unchanged benchmark artifact beginning at the same top edge. Replaces all incremental card positioning offsets. Mobile retains stacked layout.
- Professional Experience restored to the 03 / ENGINEERING BACKGROUND top edge per revised instruction; no role spacing or leadership content changes.
- Replaced angular AM icon with simplified am. on graphite, pale-green period. Browser favicon includes 16/32/48px representations; icon.png is 48px. Visual inspection confirms small-size legibility.

- Education top alignment revised: the section label/heading and academic details now share the left column; Technical Skills starts at the 06 / EDUCATION label on the right. Academic content retains its 36px separation below the heading; skill categories and widths are unchanged.

- Page background darkened subtly from #111413 to #0c0e0d; foreground typography and card surfaces preserved.

- Removed Education viewport-based minimum height after user feedback showing excessive bottom whitespace. Final section now uses ordinary section padding, with no forced filler height.

- Featured result label stacks beneath 4.8%, with left alignment, unrestricted text width, and a 6px gap. Rebalanced divider padding preserves the existing result-block/card height; bars, data, and animation unchanged.

- Replaced the About photograph with the user-supplied portrait, stored unchanged at public/profile-current.png; existing photo layout and alternative text retained.

- Removed the portrait saturation filter so the user-supplied photo displays with original colors. Footer bottom padding increased 15%, from 32px to 36.8px, with top padding unchanged.

- Footer bottom padding updated to an explicit 50px per the final user correction; top padding remains 32px.
