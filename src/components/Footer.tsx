import { Mail, Linkedin, Github, Twitter } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-[120rem] mx-auto px-6 lg:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About Column */}
          <div>
            <h3 className="font-heading text-lg font-bold mb-4">PORTFOLIO</h3>
            <p className="font-paragraph text-sm text-primary-foreground/80">
              Showcasing creative work and professional expertise through innovative projects and solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-lg font-bold mb-4">QUICK LINKS</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="font-paragraph text-sm text-primary-foreground/80 hover:text-brandaccent transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/projects" className="font-paragraph text-sm text-primary-foreground/80 hover:text-brandaccent transition-colors">
                  Projects
                </a>
              </li>
              <li>
                <a href="/about" className="font-paragraph text-sm text-primary-foreground/80 hover:text-brandaccent transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="/skills" className="font-paragraph text-sm text-primary-foreground/80 hover:text-brandaccent transition-colors">
                  Skills
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-heading text-lg font-bold mb-4">CONNECT</h3>
            <div className="flex gap-4">
              <a
                href="mailto:contact@portfolio.com"
                className="p-2 bg-primary-foreground/10 hover:bg-brandaccent rounded transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-primary-foreground/10 hover:bg-brandaccent rounded transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-primary-foreground/10 hover:bg-brandaccent rounded transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-primary-foreground/10 hover:bg-brandaccent rounded transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-6">
          <p className="font-paragraph text-sm text-center text-primary-foreground/60">
            © {currentYear} Portfolio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
