# My Digital Contact Page

This repository houses code that powers my corner of the web at [sahil-tandon.github.io](https://sahil-tandon.github.io), lovingly crafted to serve as a platform for people to learn a little about me and get in touch.

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework for production
- [TypeScript](https://www.typescriptlang.org/) - Static type checking
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Lucide Icons](https://lucide.dev/) - Icons library
- [Formspree](https://formspree.io/) - Form handling
- [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote) + [rehype-pretty-code](https://rehype-pretty-code.netlify.app/) - MDX-based blog with build-time syntax highlighting
- [Giscus](https://giscus.app/) - GitHub Discussions powered comments

## Getting Started

```bash
# Clone the repository
git clone https://github.com/sahil-tandon/sahil-tandon.github.io.git

# Navigate to repository
cd sahil-tandon.github.io

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Local Development

After setting up, run the following command to start the development server:

```bash
npm run dev
```

The site will be available at http://localhost:3000. You can now make changes and see them reflected live.

## Writing posts

Posts live as `.mdx` files in `content/posts/`. The filename is the slug — `content/posts/foo-bar.mdx` is published at `/blog/foo-bar`.

Frontmatter (validated at build time via Zod):

```yaml
---
title: "Post title"
description: "60-180 char SEO description shown on the index, in OG cards, and in RSS."
date: "YYYY-MM-DD"               # ISO 8601, required
updated: "YYYY-MM-DD"             # optional, drives lastModified in sitemap + JSON-LD
tags: ["kebab-case", "tags"]     # optional, lowercase + hyphens only
draft: false                      # optional; drafts visible in dev, omitted from prod build
ogImage: "/og/some-card.png"     # optional override; falls back to /og-default.png
canonical: "https://..."          # optional; only if THIS post mirrors elsewhere
crossposted:                      # optional; renders linkbacks at the bottom of the post
  devto: "https://dev.to/..."
  hashnode: "https://...hashnode.dev/..."
---
```

Custom MDX components available inside posts:

- `<Callout variant="info" | "warn">…</Callout>`
- `<Figure src="..." alt="..." caption="..." />`

### Drafts

Set `draft: true` and the post is visible at its slug during `npm run dev` but excluded from `generateStaticParams`, the sitemap, and the RSS feed in production.

### Cross-posting

Manual workflow: publish here first, wait 24-72 hours for Google to index, then mirror to dev.to / Hashnode setting the canonical URL back to this site. Populate `frontmatter.crossposted` so reader-facing linkbacks show up at the bottom of the post.

## Deployment

This site is automatically deployed to GitHub Pages via GitHub Actions. Every time changes are pushed to the main branch, the site is rebuilt and redeployed seamlessly.

## Contributing

If you'd like to improve or suggest changes to this project:

1. Fork the repository and create a new branch based on `main`.
2. Make your changes and ensure they work as expected.
3. Submit a pull request (PR) to merge your branch into `main`. I'll review the PR, and once approved, your changes will be deployed live!

## Versioning

This project follows [Semantic Versioning](https://semver.org/). For version history, check out the [CHANGELOG](CHANGELOG.md).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
