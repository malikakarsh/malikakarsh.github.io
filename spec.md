# malikakarsh.com Revamp

## 1. Goal

Completely revamp my personal website while preserving the strongest parts of my existing profile.

The new website should position me primarily as a software engineer increasingly focused on:

**GPU Kernels · LLM Inference · ML Systems · Performance Engineering**

However, do **not** make the website exclusively about GPU programming.

The site must simultaneously communicate:

1. I work on GPU kernels / LLM inference / low-level performance.
2. I have **2 years of professional engineering experience**.
3. I have meaningful **internship experience**, which must be visible in the Experience section.
4. I have strong software engineering fundamentals.
5. I am strong at algorithms/DSA, including a **LeetCode peak rating of 1963 and Knight rank**.
6. I have several substantial projects beyond GPU kernels.

The intended impression should be:

> Software engineer with strong algorithms and real-world engineering experience who is developing deep expertise in GPU and ML inference systems.

Do not turn the site into a generic AI portfolio or a full-screen fake terminal.

---

# 2. First step: audit the current repository

Before changing anything:

- Inspect the existing project structure.
- Identify the framework, routing system, styling approach, existing reusable components, data files, animations, fonts, and deployment configuration.
- Inspect the existing homepage and all existing project/experience content.
- Preserve correct existing URLs and external links.
- Reuse the existing framework unless there is a compelling technical reason not to.
- Do not migrate frameworks just for the redesign.
- Do not delete information without checking whether it should be repositioned elsewhere.
- Do not invent metrics, employment details, project details, technologies, dates, or achievements.

Create a short `REVAMP_PLAN.md` summarizing:
- current architecture,
- components that can be reused,
- components that should be replaced,
- proposed new component tree,
- pages/routes that will be affected.

Then implement the redesign.

---

# 3. Overall visual direction

The visual identity should feel like:

**personal portfolio × GPU performance lab × technical notebook**

NOT:

- cyberpunk hacker site,
- fake Linux terminal everywhere,
- neon gaming UI,
- generic AI gradient site,
- particle-network background,
- excessive glassmorphism,
- dozens of animated cards.

The site should feel appropriate for someone applying to serious software engineering, GPU systems, compiler, ML infrastructure, and inference roles.

## Design language

Use:

- dark graphite / near-black background,
- restrained borders,
- subtle grid or technical texture if useful,
- generous whitespace,
- strong typography,
- one primary accent color,
- restrained animation,
- monospace typography for metrics, labels, code, kernel metadata, etc.,
- normal high-quality sans-serif typography for descriptions and long-form text.

Do not render the entire website in monospace.

Potential technical labels can look like:

```text
KERNEL / GEMV
DEVICE / NVIDIA T4
DTYPE / FP16
FRAMEWORK / TRITON
STATUS / BENCHMARKED
```

These should be small visual details rather than dominating the design.

---

# 4. Homepage information architecture

Use approximately this order:

```text
NAVIGATION

HERO

CREDIBILITY STRIP

FEATURED ENGINEERING / FASTINFER

EXPERIENCE

SELECTED PROJECTS

ALGORITHMS / LEETCODE

ENGINEERING NOTES

ABOUT / OFF THE CLOCK

OPTIONAL TERMINAL EASTER EGG

FOOTER
```

Do not bury Experience or LeetCode near the very bottom.

---

# 5. Navigation

Desktop navigation should provide fast access to:

- Work / Projects
- Experience
- Notes
- About
- Resume

Also include icons or links for:

- GitHub
- LinkedIn

Use a compact sticky navbar if appropriate.

Mobile navigation must remain simple and accessible.

---

# 6. Hero section

The first screen should immediately establish my technical direction without making me appear narrowly specialized.

Suggested hierarchy:

```text
AKARSH MALIK

GPU Kernels · LLM Inference · Systems

Software engineer exploring high-performance GPU kernels,
LLM inference systems, and low-level performance optimization.

MS Computer Science @ NYU · New York

[ Explore My Work ] [ Resume ] [ GitHub ]
```

Copy can be refined based on the actual content already in the repository.

Do not use language such as:

- "GPU expert"
- "CUDA expert"
- "high-performance computing expert"

unless the source content genuinely supports those claims.

The positioning should demonstrate specialization without exaggerating expertise.

---

# 7. Credibility strip

Immediately following or integrated into the hero, show important signals that recruiters can understand in seconds.

Suggested structure:

```text
2 YEARS
Engineering Experience

1963
LeetCode Peak · Knight

NYU
MS Computer Science

GPU / ML SYSTEMS
Triton · PyTorch · Performance
```

Important:

**Use 2 years of experience. Do not display 3+ years.**

This section should be compact and visually strong.

The LeetCode rating should not be hidden.

---

# 8. Featured Engineering section

FastInfer should be the flagship technical project.

It should receive significantly more visual weight than a normal project card.

Possible structure:

```text
FEATURED ENGINEERING

FastInfer

Exploring custom GPU kernels and transformer inference
performance using Triton and PyTorch.

[performance visualization]

[technical summary]

[View Project] [GitHub]
```

Show actual performance measurements where appropriate.

Possible visualization:

```text
PyTorch       █████████████████
Triton        ██████████████

116.6 μs       →       99.2 μs
```

However:

- only use benchmark values that are verified,
- preferably pull them from the existing FastInfer documentation/data,
- clearly distinguish microbenchmarks from end-to-end model results,
- never imply a microbenchmark improvement equals an equivalent model-level speedup.

Include small metadata such as:

```text
TRITON
PYTORCH
GPU KERNELS
LLM INFERENCE
BENCHMARKING
```

---

# 9. Important project distinction

**FastInfer and my existing “LLM Inference Engine” project are separate projects.**

Do not merge them.

They should have separate descriptions and separate project entries.

FastInfer can be the featured GPU-kernel project.

The other LLM inference project should remain part of Selected Projects if it is currently on the website/resume.

---

# 10. Experience section

Experience is a major part of the website and should not be minimized because of the new GPU focus.

The section heading should simply be:

**Experience**

Display all significant professional roles, including:

- full-time experience,
- internships.

Internships must appear in this section.

Do not create the impression that internships do not count as engineering experience.

Use reverse chronological order.

Each experience entry should contain:

```text
COMPANY

Role
Employment Type
Dates
Location

• Impact-oriented accomplishment
• Engineering contribution
• Quantified result where available

Technology / Technology / Technology
```

Example visual treatment:

```text
AB INBEV

Software Engineer
FULL-TIME
202X — 202X

Description...
Description...


COMPANY NAME

Software Engineering Intern
INTERNSHIP
Summer 202X

Description...
Description...
```

Use small `FULL-TIME` / `INTERNSHIP` labels to distinguish role type.

Internships should still receive proper descriptions and accomplishments rather than being reduced to one line.

Keep the section highly scannable.

The experience section should remain one of the largest sections of the homepage.

---

# 11. Selected Projects

After FastInfer and Experience, show approximately 3–5 additional strong projects.

Potential structure:

```text
SELECTED PROJECTS

01
LLM Inference Engine
Description...
[systems] [inference] [...]

02
Marginalia
Description...
[...]

03
Another strong project
Description...
[...]
```

Do not use six identical generic cards.

Give each project enough context to communicate:

- problem,
- engineering work,
- interesting technical component,
- outcome.

Where available, include measurable results.

Every project should have relevant links such as:

- GitHub,
- demo,
- technical writeup.

FastInfer may appear here visually as `01 / FEATURED`, but do not duplicate the entire flagship section.

---

# 12. Algorithms / LeetCode section

LeetCode is important to my profile and should remain clearly visible.

Create a polished, compact section such as:

```text
ALGORITHMS

LeetCode Knight

Peak Rating
1963

Problems Solved
<actual verified number>

Strong foundations in
Graphs · Dynamic Programming · Trees · Binary Search · Algorithms
```

Only include statistics that can be verified from the current website or profile.

Provide a link to my LeetCode profile.

Avoid gamifying this section excessively.

It should communicate:

> strong algorithms / interview / problem-solving ability

rather than looking like a competitive-programming dashboard.

---

# 13. Engineering Notes

Add support for technical notes/articles.

Possible topics include:

- Why GEMV matters during autoregressive decoding
- GEMV vs GEMM during inference
- Understanding RMSNorm
- Writing a Triton kernel
- CUDA synchronization and timing
- Why kernel-level improvements may disappear at model level
- Memory-bound vs compute-bound workloads
- KV caching
- Batching and decoding strategies

Initially this can use static/local content.

Create a clean reusable architecture so new notes can be added easily.

Suggested route:

```text
/notes
/notes/<slug>
```

Each note should support:

- title,
- publication date,
- tags,
- description,
- article content,
- code snippets,
- optional figures,
- related project.

Do not populate fake articles just to make the page look full.

If no real note content currently exists, create the infrastructure and use only legitimate existing material.

---

# 14. Project detail pages

Important technical projects should have dedicated pages rather than relying entirely on cards.

Suggested route:

```text
/projects/fastinfer
/projects/<project-slug>
```

FastInfer detail page can contain:

```text
Overview
Problem
Architecture
Kernel implementation
Correctness methodology
Benchmark methodology
Results
Model integration
What worked
What did not
Limitations
Next steps
Links
```

This should feel closer to an engineering case study than a marketing project page.

---

# 15. About section

Retain some personality.

Include my real photograph.

Include a concise human description.

Retain relevant "off the clock" material such as running/hiking if currently present.

The website should not feel like a benchmark dashboard created by an anonymous engineer.

A small amount of personal information makes it more memorable.

---

# 16. Terminal Easter egg

The terminal concept can exist, but it must **not** become the primary navigation system.

Add a small optional interaction such as:

```text
akarsh@malik:~$ _
```

Clicking it can open a mini terminal.

Possible commands:

```text
help
whoami
projects
kernels
experience
leetcode
resume
contact
clear
```

Optional fun commands:

```text
nvidia-smi
sudo hire akarsh
```

This should be an Easter egg.

The normal site must remain completely usable without it.

On mobile, the feature can be simplified or omitted if it hurts usability.

---

# 17. Animations

Animations should support comprehension.

Good examples:

- subtle number transitions,
- benchmark bars animating once,
- small hover movement,
- timeline reveal,
- command cursor blink,
- code or metric highlighting.

Avoid:

- constant particle effects,
- dramatic page transitions,
- cursor-following effects everywhere,
- excessive glow,
- scroll hijacking,
- typing animations that force the visitor to wait.

Respect:

```css
prefers-reduced-motion
```

---

# 18. Mobile behavior

The site must look excellent on mobile.

Explicitly test:

- ~375 px
- ~430 px
- tablet
- desktop
- large desktop

On mobile:

- stack benchmark cards,
- keep metrics legible,
- avoid horizontal code overflow,
- collapse navigation,
- ensure buttons have sufficient touch area,
- preserve Experience readability,
- preserve LeetCode visibility.

Do not make the mobile layout an afterthought.

---

# 19. Accessibility

Ensure:

- semantic HTML,
- correct heading hierarchy,
- keyboard navigation,
- visible focus states,
- sufficient contrast,
- meaningful alt text,
- reduced-motion support,
- buttons vs links used correctly,
- terminal interaction usable via keyboard,
- no essential information available only on hover.

Aim for Lighthouse accessibility near 100.

---

# 20. Performance

This is especially important because the website represents someone interested in performance engineering.

Do not ship an unnecessarily heavy portfolio.

Optimize:

- images,
- fonts,
- JavaScript,
- third-party libraries,
- animations.

Prefer CSS over heavy animation libraries where possible.

Lazy-load non-critical visual assets.

Avoid a large client-side bundle just for decorative effects.

The website itself should demonstrate good engineering judgment.

---

# 21. SEO / metadata

Implement proper:

- page titles,
- descriptions,
- OpenGraph metadata,
- Twitter/social cards,
- canonical URLs,
- sitemap,
- robots.txt where relevant,
- structured metadata if useful.

Example positioning:

```text
Akarsh Malik — Software Engineer | GPU Kernels & LLM Inference
```

Do not make every page title identical.

---

# 22. Content should be data-driven

Where practical, separate content from presentation.

For example:

```text
data/
  experience
  projects
  skills
  socialLinks
  leetcode
```

or the framework's equivalent.

Experience entries should include something similar to:

```text
company
role
type
startDate
endDate
location
description
bullets
technologies
companyUrl
```

`type` should support:

```text
Full-time
Internship
```

This makes future updates easy.

---

# 23. Desktop composition

Aim for a visually interesting layout without turning everything into cards.

Use:

- large editorial sections,
- horizontal project treatments,
- technical metadata,
- occasional grid layouts,
- timelines,
- benchmark visualizations.

Avoid:

```text
card
card
card
card
card
card
```

for the entire website.

The page should have visual rhythm.

---

# 24. Suggested implementation phases

## Phase 1 — Audit and foundation

- inspect existing repository
- write `REVAMP_PLAN.md`
- preserve existing routes/content
- create design tokens
- establish typography
- establish layout system
- establish responsive breakpoints

Do not redesign individual sections before the foundation is clean.

---

## Phase 2 — Hero + navigation

Implement:

- navbar
- hero
- CTA buttons
- credibility strip

Verify:

- 2 years experience
- LeetCode 1963 / Knight
- NYU
- GPU/inference positioning

---

## Phase 3 — FastInfer

Implement:

- flagship project component
- benchmark visualization
- metadata
- project links
- responsive behavior

Then create the FastInfer project detail page.

---

## Phase 4 — Experience

Migrate all existing professional roles.

Include internships.

Ensure each experience has the correct employment type.

Do not shorten internship entries simply because they are internships.

---

## Phase 5 — Selected Projects

Migrate and redesign current projects.

Keep:

- FastInfer,
- LLM Inference Engine as a distinct project,
- other strongest projects from the current portfolio.

Prioritize quality over number of projects.

---

## Phase 6 — LeetCode / Algorithms

Implement:

- Knight status
- 1963 peak rating
- verified problem count if available
- profile link
- tasteful visual treatment.

---

## Phase 7 — Notes infrastructure

Implement:

```text
/notes
/notes/[slug]
```

Add only legitimate content.

---

## Phase 8 — About + terminal

Implement:

- real photograph
- short bio
- off-the-clock details
- optional mini terminal Easter egg.

---

## Phase 9 — polish

Check:

- mobile
- typography
- spacing
- animation
- accessibility
- SEO
- browser compatibility
- loading performance
- broken links.

---

# 25. Final acceptance criteria

Do not consider the revamp finished until the following statements are all true.

### Identity

Within five seconds, a visitor understands that I work primarily toward:

**GPU kernels / LLM inference / systems engineering.**

### Experience

A recruiter can clearly see:

**2 years of engineering experience.**

Internships are visible in the Experience section.

### Algorithms

A recruiter can find:

**LeetCode Knight — peak 1963**

without hunting through the site.

### Projects

FastInfer is the flagship project.

The LLM Inference Engine remains a separate project.

Other strong projects remain accessible.

### Usability

A recruiter who does not understand terminal commands can navigate the entire website normally.

### Personality

The website still contains my photograph and some human/personal context.

### Engineering quality

The website is:

- responsive,
- accessible,
- fast,
- maintainable,
- visually polished.

### Tone

The website feels like the portfolio of a serious engineer, not a template or hacker-themed gimmick.

---

# 26. Important constraints

Do not:

- claim 3+ years experience,
- merge FastInfer with the separate LLM Inference Engine project,
- remove internships,
- hide LeetCode,
- make the whole website a terminal,
- fabricate benchmarks,
- fabricate job accomplishments,
- fabricate technologies,
- fabricate project metrics,
- overstate my expertise,
- delete existing useful content just to make the design minimal,
- rebuild the application in a new framework unnecessarily.

When information is missing, leave a clear TODO rather than inventing it.

---

# 27. Working style while implementing

Work incrementally.

After each major phase:

1. run the project,
2. check for build errors,
3. test the affected layout,
4. fix TypeScript/lint errors,
5. ensure no existing route was unintentionally broken.

Prefer reusable components rather than page-specific duplicated markup.

Keep the implementation clean enough that adding a new:

- job,
- internship,
- project,
- benchmark,
- technical note

requires editing data/content rather than redesigning the page.

The final result should feel custom-built around my profile rather than adapted from a generic portfolio template.