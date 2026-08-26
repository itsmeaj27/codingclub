import { Logo } from "@/components/logo";
import { menuLinks } from "@/lib/constants";
import Link from "next/link";
import { Github, Instagram, Linkedin, Mail } from "lucide-react";

export default function FooterSection() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black pt-16 pb-8">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <Link href="/" aria-label="go home" className="block size-fit mb-4">
              <Logo />
            </Link>
            <p className="text-zinc-600 dark:text-zinc-400 max-w-sm mb-2">
              Coding Club CUH
            </p>
            <p className="text-zinc-500 dark:text-zinc-500 text-sm">
              Central University of Haryana, Mahendragarh
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-zinc-900 dark:text-white mb-4 tracking-wider uppercase text-sm">Quick Links</h3>
            <ul className="space-y-3">
              {menuLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-zinc-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400 text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-zinc-900 dark:text-white mb-4 tracking-wider uppercase text-sm">Connect</h3>
            <div className="flex gap-4 mb-8">
              <Link
                href="https://www.instagram.com/codingclubcuh/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-pink-600 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </Link>
              <Link
                href="https://www.linkedin.com/company/coding-club-cuh/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-blue-600 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link
                href="https://github.com/codingclubcuh"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
              >
                <Github className="w-5 h-5" />
              </Link>
            </div>

            <h3 className="font-semibold text-zinc-900 dark:text-white mb-4 tracking-wider uppercase text-sm">Contact</h3>
            <a href="mailto:contact@codingclubcuh.in" className="flex items-center gap-2 text-zinc-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400 text-sm transition-colors">
              <Mail className="w-4 h-4" />
              contact@codingclubcuh.in
            </a>
          </div>
        </div>

        <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800 text-center">
          <p className="text-zinc-500 text-sm">
            © {new Date().getFullYear()} Coding Club CUH. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
