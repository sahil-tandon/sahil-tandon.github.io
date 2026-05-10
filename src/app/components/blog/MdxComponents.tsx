import type { ComponentProps, ReactNode } from 'react';
import { CopyButton } from './CopyButton';

const extractText = (node: ReactNode): string => {
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(extractText).join('');
  if (node && typeof node === 'object' && 'props' in node) {
    return extractText((node as { props: { children?: ReactNode } }).props.children);
  }
  return '';
};

const Pre = ({ children, ...rest }: ComponentProps<'pre'>) => {
  const text = extractText(children);
  return (
    <pre {...rest} className="relative">
      {children}
      <CopyButton text={text} />
    </pre>
  );
};

const Callout = ({
  children,
  variant = 'info',
}: {
  children: ReactNode;
  variant?: 'info' | 'warn';
}) => {
  const accent =
    variant === 'warn'
      ? 'border-amber-400/40 bg-amber-400/5 text-amber-100/90'
      : 'border-violet-400/40 bg-violet-400/5 text-violet-100/90';
  return (
    <aside
      className={`my-6 rounded-md border-l-2 ${accent} px-4 py-3 text-sm font-light not-italic`}
    >
      {children}
    </aside>
  );
};

const Figure = ({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) => (
  <figure className="my-6">
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src={src} alt={alt} loading="lazy" />
    {caption && (
      <figcaption className="mt-2 text-xs text-zinc-500 text-center font-light">
        {caption}
      </figcaption>
    )}
  </figure>
);

export const mdxComponents = {
  pre: Pre,
  Callout,
  Figure,
};
