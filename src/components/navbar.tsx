"use client";
import React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { menuLinks } from "@/lib/constants";
import { ModeToggle } from "./theme-mode-toggler";

const Navbar = () => {
  const [menuState, setMenuState] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [user, setUser] = React.useState<Record<string, unknown> | null>(null);
  const pathname = usePathname();

  React.useEffect(() => {
    setIsScrolled(window.scrollY > 2);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 2);
    };
    window.addEventListener("scroll", handleScroll);

    // Check auth status
    fetch('/api/users/me')
      .then(res => res.json())
      .then(data => {
        if (data?.user) {
          setUser(data.user);
        }
      })
      .catch(() => {});

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const allLinks = [...menuLinks, { name: "Verify Certificate", href: "/verify" }];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300">
        <div className={cn("mx-auto transition-all duration-300", isScrolled ? "pt-4 px-4 max-w-5xl" : "pt-0 px-0 max-w-full")}>
          <nav
            className={cn(
              "flex items-center justify-between transition-all duration-300",
              isScrolled
                ? "glass-card px-6 py-3 rounded-full border border-border shadow-lg shadow-black/5"
                : "bg-background/80 backdrop-blur-md border-b border-border px-6 py-4 lg:px-12"
            )}
          >
            <Link
              href="/"
              aria-label="home"
              className="flex items-center space-x-2 z-50"
              onClick={() => setMenuState(false)}
            >
              <Logo />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              <ul className="flex items-center gap-6 text-sm font-medium">
                {allLinks.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "relative py-1 text-muted-foreground hover:text-foreground transition-colors duration-200",
                          isActive && "text-foreground font-semibold"
                        )}
                      >
                        {item.name}
                        {isActive && (
                          <span className="absolute left-0 bottom-0 w-full h-[2px] bg-primary rounded-full" />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center gap-4">
              <ModeToggle />
              {user ? (
                <Button asChild variant="ghost" size="sm" className="hover:bg-primary/10">
                  <Link href="/student">Dashboard</Link>
                </Button>
              ) : (
                <Button asChild variant="ghost" size="sm" className="hover:bg-primary/10">
                  <Link href="/auth/login">Sign In</Link>
                </Button>
              )}
              <Button
                asChild
                size="sm"
                className="bg-gradient-to-r from-blue-500 to-violet-500 text-white hover:opacity-90 transition-opacity glow-hover border-0"
              >
                <Link href="/auth/signup">Join Club</Link>
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMenuState(!menuState)}
              aria-label={menuState ? "Close Menu" : "Open Menu"}
              className="relative z-50 block p-2 text-foreground lg:hidden"
            >
              {menuState ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-background/95 backdrop-blur-xl transition-transform duration-500 ease-in-out lg:hidden",
          menuState ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full pt-32 pb-8 px-8">
          <ul className="flex flex-col gap-6 text-xl font-medium mb-auto">
            {allLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMenuState(false)}
                    className={cn(
                      "block transition-colors",
                      isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex flex-col gap-4 mt-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-muted-foreground">Theme</span>
              <ModeToggle />
            </div>
            
            {user ? (
              <Button asChild variant="outline" className="w-full justify-center">
                <Link href="/student" onClick={() => setMenuState(false)}>Dashboard</Link>
              </Button>
            ) : (
              <Button asChild variant="outline" className="w-full justify-center">
                <Link href="/auth/login" onClick={() => setMenuState(false)}>Sign In</Link>
              </Button>
            )}
            
            <Button
              asChild
              className="w-full justify-center bg-gradient-to-r from-blue-500 to-violet-500 text-white border-0"
            >
              <Link href="/auth/signup" onClick={() => setMenuState(false)}>Join Club</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
