'use client';

import { FileText, Github, Linkedin, Mail } from 'lucide-react';
import { trackLinkClick } from '@/lib/analytics';

interface SocialLink {
  icon: JSX.Element;
  label: string;
  href: string;
  isExternal: boolean;
}

const socialLinks: SocialLink[] = [
  {
    icon: <FileText className="w-5 h-5" />,
    label: "Resume",
    href: "/sahil-tandon-resume.pdf",
    isExternal: true,
  },
  {
    icon: <Linkedin className="w-5 h-5" />,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/tandonsahil/",
    isExternal: true,
  },
  {
    icon: <Github className="w-5 h-5" />,
    label: "GitHub",
    href: "https://github.com/sahil-tandon",
    isExternal: true,
  },
  {
    icon: <Mail className="w-5 h-5" />,
    label: "Email",
    href: "mailto:sahil.tandon@live.com",
    isExternal: false,
  },
];

export function SocialLinks() {
  const handleClick = (link: SocialLink) => {
    trackLinkClick(link.label, link.href);
  };

  return (
    <div className="flex flex-wrap gap-8">
      {socialLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target={link.isExternal ? "_blank" : undefined}
          rel={link.isExternal ? "noopener noreferrer" : undefined}
          onClick={() => handleClick(link)}
          className="group flex items-center space-x-3 py-2 border-b border-transparent hover:border-violet-400 transition-all duration-300"
        >
          <span className="text-zinc-300 group-hover:text-violet-400 transition-colors">            
            <span className="block w-6 h-6">{link.icon}</span>
          </span>
          <span className="text-sm text-zinc-500 group-hover:text-zinc-100 transition-colors">
            {link.label}
          </span>
        </a>
      ))}
    </div>
  );
}