# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.4.0] - 2026-05-10

### Added

- Writing/blog section at `/blog` with per-post pages at `/blog/[slug]`, posts grouped by year on the index.
- MDX content layer in `content/posts/` powered by `next-mdx-remote`, `gray-matter`, and Zod-validated frontmatter.
- Build-time syntax highlighting via `rehype-pretty-code` + Shiki, plus heading anchors via `rehype-slug` and `rehype-autolink-headings`.
- Custom MDX components: `<Callout>`, `<Figure>`, and a copy button on every code block.
- "Latest writing" strip on the homepage surfacing the three most recent posts.
- RSS feed at `/feed.xml`, sitemap at `/sitemap.xml`, robots at `/robots.txt`.
- `BlogPosting` JSON-LD on post pages and `Person` + `WebSite` JSON-LD on the homepage.
- Per-post canonical URLs, Open Graph (`type: article`, publishedTime, modifiedTime, tags), and Twitter cards.
- Layout-level `metadataBase` plus site-wide OG and Twitter card defaults.
- Discreet RSS link in the footer.
- Giscus comments scaffold (renders a placeholder until repo IDs are filled into `src/lib/site.ts`).
- Crosspost linkbacks to dev.to / Hashnode when `frontmatter.crossposted` is populated.
- Placeholder 1200×630 OG image at `public/og-default.png`.
- Hand-rolled `.prose-blog` styles in `globals.css` to render MDX bodies in the existing violet-on-zinc palette.
- README "Writing posts" section documenting authoring workflow.

### Changed

- Upgraded React and React DOM from `^18` to `^19.2` to align with `next-mdx-remote@5` and Next.js 15's React 19 baseline.
- `SocialLinks.tsx`: replaced the bare `JSX.Element` type with `React.ReactElement` (React 19 removed the global JSX namespace) — pure type change, identical render.
- `Footer.tsx`: added an RSS link on the left; existing signature and heart unchanged.
- `next.config.ts`: added `pageExtensions: ['ts', 'tsx', 'mdx']`.
- `tailwind.config.ts`: scan `content/**/*.mdx` so utility classes used inside posts emit to production CSS.

## [0.3.0] - 2024-10-29

### Added

- Google Analytics 4 integration for user engagement tracking.
- Standalone FormField component for form input styling.
- Analytics event tracking for user interactions.

### Changed

- Enhanced form field hover states with a gradient glow effect.
- Updated name heading color to violet-400.
- Fixed textarea spacing in form fields.
- Corrected title text alignment with -4px margin.
- Refined spacing between sections and typography.
- Improved form styling and button interactions.
- Enhanced contact form styling and copy.
- Improved typewriter cursor behavior and mobile text wrapping.

## [0.2.0] - 2024-10-28

### Added

- Animated typewriter effect with blinking cursor in hero section.
- Custom animation keyframes in Tailwind configuration.
- Tailwind configuration for Oxanium font family.

### Changed

- Replaced local Geist font with Oxanium from Google Fonts for design refresh.
- Refined typography scales and font weights.
- Improved responsive layout spacing.
- Updated page metadata with proper title and description.

### Removed

- Local Geist font files from /fonts directory.

## [0.1.0] - 2024-10-24

### Added

- Initial project setup with Next.js, TypeScript, and Tailwind CSS.
- Basic responsive dark theme layout.
- Interactive spotlight background effect with scroll support.
- Hero section with name and description.
- Social links section with external link handling.
- Contact form integration with Formspree.
- Custom themed scrollbar.
- Static export configuration.
