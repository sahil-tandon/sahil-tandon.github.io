import { FileText, Github, Linkedin, Mail } from 'lucide-react';

interface SocialLink {
  icon: JSX.Element;
  label: string;
  href: string;
}

const socialLinks: SocialLink[] = [
  {
    icon: <FileText className="w-6 h-6" />,
    label: "Resume",
    href: "/sahil-tandon-resume.pdf",
  },
  {
    icon: <Linkedin className="w-6 h-6" />,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/tandonsahil/",
  },
  {
    icon: <Github className="w-6 h-6" />,
    label: "GitHub",
    href: "https://github.com/sahil-tandon",
  },
  {
    icon: <Mail className="w-6 h-6" />,
    label: "Email",
    href: "mailto:sahil.tandon@live.com",
  },
];

export function SocialLinks() {
  return (
    <div className="flex flex-wrap gap-8">
      {socialLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          className="group flex items-center space-x-2 py-2 border-b border-transparent hover:border-violet-400 transition-all duration-300"
        >
          <span className="text-violet-200 group-hover:text-violet-400 transition-colors">
            {link.icon}
          </span>
          <span className="text-zinc-400 group-hover:text-zinc-100 transition-colors">
            {link.label}
          </span>
        </a>
      ))}
    </div>
  );
}