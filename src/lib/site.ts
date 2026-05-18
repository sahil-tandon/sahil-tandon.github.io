export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
  'https://sahil-tandon.github.io';

export const SITE_NAME = 'Sahil Tandon';
export const SITE_TAGLINE = 'Frontend Engineer & Product Enthusiast';
export const SITE_DESCRIPTION =
  'Frontend Engineer with a passion for crafting delightful digital experiences that solve business problems.';

export const AUTHOR = {
  name: 'Sahil Tandon',
  url: SITE_URL,
  email: 'sahil.tandon@live.com',
  twitter: '',
  linkedin: 'https://www.linkedin.com/in/tandonsahil/',
  github: 'https://github.com/sahil-tandon',
} as const;

export const BLOG = {
  basePath: '/blog',
  title: 'Writing',
  description: 'Notes on systems, frontend, and devtools.',
} as const;

export const OG = {
  defaultImage: '/og-default.png',
  width: 1200,
  height: 630,
} as const;

export const GISCUS = {
  repo: 'sahil-tandon/sahil-tandon.github.io',
  repoId: '',
  category: 'Comments',
  categoryId: '',
  mapping: 'pathname',
  reactionsEnabled: '1',
  emitMetadata: '0',
  inputPosition: 'top',
  theme: 'dark',
  lang: 'en',
} as const;

export const absoluteUrl = (path: string): string => {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${cleanPath}`;
};
