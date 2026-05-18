import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import type { MDXRemoteProps } from 'next-mdx-remote/rsc';

export const mdxOptions: MDXRemoteProps['options'] = {
  parseFrontmatter: false,
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'wrap',
          properties: {
            className: ['heading-anchor'],
            ariaLabel: 'Link to this heading',
          },
        },
      ],
      [
        rehypePrettyCode,
        {
          theme: 'github-dark-dimmed',
          keepBackground: false,
          defaultLang: 'plaintext',
        },
      ],
    ],
  },
};
