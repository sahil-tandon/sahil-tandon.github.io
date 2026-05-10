import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Rss, MessageSquare } from 'lucide-react';
import type { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';

import { SpotlightBackground } from '@/components/SpotlightBackground';
import { Footer } from '@/components/Footer';
import { PostHeader } from '@/components/blog/PostHeader';
import { JsonLd } from '@/components/blog/JsonLd';
import { Comments } from '@/components/blog/Comments';
import { CrosspostLinks } from '@/components/blog/CrosspostLinks';
import { mdxComponents } from '@/components/blog/MdxComponents';
import { mdxOptions } from '@/lib/mdx';
import { getAllSlugs, getPostBySlug } from '@/lib/posts';
import { AUTHOR, BLOG, OG, SITE_NAME, absoluteUrl } from '@/lib/site';

type Params = { slug: string };

export const dynamicParams = false;

export const generateStaticParams = async (): Promise<Params[]> =>
  getAllSlugs().map((slug) => ({ slug }));

export const generateMetadata = async ({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> => {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const url = absoluteUrl(`${BLOG.basePath}/${slug}`);
  const ogImage = post.frontmatter.ogImage ?? OG.defaultImage;

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    alternates: {
      canonical: post.frontmatter.canonical ?? url,
    },
    openGraph: {
      type: 'article',
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      url,
      publishedTime: post.frontmatter.date,
      modifiedTime: post.frontmatter.updated ?? post.frontmatter.date,
      authors: [AUTHOR.name],
      tags: post.frontmatter.tags,
      images: [
        {
          url: ogImage,
          width: OG.width,
          height: OG.height,
          alt: post.frontmatter.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      images: [ogImage],
    },
  };
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const url = absoluteUrl(`${BLOG.basePath}/${slug}`);
  const ogImage = post.frontmatter.ogImage ?? OG.defaultImage;

  const blogPosting = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.frontmatter.title,
    description: post.frontmatter.description,
    datePublished: post.frontmatter.date,
    dateModified: post.frontmatter.updated ?? post.frontmatter.date,
    author: {
      '@type': 'Person',
      name: AUTHOR.name,
      url: AUTHOR.url,
    },
    image: absoluteUrl(ogImage),
    mainEntityOfPage: url,
    keywords: post.frontmatter.tags.join(', '),
    publisher: {
      '@type': 'Person',
      name: AUTHOR.name,
      url: AUTHOR.url,
    },
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 overflow-hidden relative flex flex-col">
      <JsonLd data={blogPosting} />
      <SpotlightBackground />

      <article className="flex-1 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-20 w-full">
        <Link
          href={BLOG.basePath}
          className="inline-flex items-center gap-2 text-xs text-zinc-500 hover:text-violet-400 transition-colors tracking-wider mb-12"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          ALL WRITING
        </Link>

        <PostHeader post={post} />

        <hr className="border-t border-zinc-900 my-8" />

        <div className="prose-blog">
          <MDXRemote
            source={post.content}
            components={mdxComponents}
            options={mdxOptions}
          />
        </div>

        <hr className="border-t border-zinc-900 my-12" />

        <CrosspostLinks crossposted={post.frontmatter.crossposted} />

        <section
          aria-labelledby="comments-heading"
          className="border border-zinc-900 rounded-lg p-6 bg-zinc-950/40"
        >
          <div className="flex items-center gap-2 text-sm text-zinc-400 mb-4">
            <MessageSquare className="w-3.5 h-3.5" />
            <h2
              id="comments-heading"
              className="tracking-wider text-xs uppercase font-medium"
            >
              Comments
            </h2>
            <span className="text-zinc-600 text-xs">— powered by Giscus</span>
          </div>
          <Comments />
        </section>

        <div className="mt-12 flex items-center justify-between text-xs text-zinc-500 tracking-wider">
          <Link
            href={BLOG.basePath}
            className="hover:text-violet-400 transition-colors"
          >
            ← ALL WRITING
          </Link>
          <Link
            href="/feed.xml"
            className="hover:text-violet-400 transition-colors flex items-center gap-1.5"
          >
            <Rss className="w-3 h-3" />
            SUBSCRIBE
          </Link>
        </div>
      </article>

      <Footer />
    </main>
  );
}
