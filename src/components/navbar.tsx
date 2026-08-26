"use client";
import React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { menuLinks } from "@/lib/constants";
import { ModeToggle } from "./theme-mode-toggler";

const Navbar = () => {
  const [menuState, setMenuState] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [user, setUser] = React.useState<Record<string, unknown> | null>(null);

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

  return (
    <div className="border border-grid">
      <header className="relative z-50 w-full h-[8vh] md:h-[10vh] container-wrapper ">
        <nav
          data-state={menuState && "active"}
          className="fixed w-full px-2 z-50 "
        >
          <div
            className={cn(
              "mx-auto mt-2 max-w-[1400px] px-6 transition-all duration-300 lg:px-12",
              isScrolled &&
                "bg-background/50 max-w-7xl rounded-2xl border backdrop-blur-lg lg:px-5",
            )}
          >
            <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
              <div className="flex w-full justify-between lg:w-auto">
                <Link
                  href="/"
                  aria-label="home"
                  className="flex items-center space-x-2"
                >
                  <Logo />
                </Link>

                <button
                  onClick={() => setMenuState(!menuState)}
                  aria-label={menuState === true ? "Close Menu" : "Open Menu"}
                  className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
                >
                  <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                  <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                </button>
              </div>

              <div className="hidden flex-1 justify-center lg:flex px-2 xl:px-4">
                <ul className="flex gap-4 xl:gap-8 text-sm whitespace-nowrap">
                  {menuLinks.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-muted-foreground hover:text-accent-foreground block duration-150"
                      >
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-background in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
                <div className="lg:hidden">
                  <ul className="space-y-6 text-base">
                    {menuLinks.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="text-muted-foreground hover:text-accent-foreground block duration-150"
                        >
                          <span>{item.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className={cn(isScrolled && "lg:hidden")}
                  >
                    <Link href="/admin">
                      <span>Admin</span>
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="sm">
                    <Link href="/verify">
                      <span>Verify Certificate</span>
                    </Link>
                  </Button>
                  {user ? (
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                    >
                      <Link href="/student">
                        <span>Dashboard</span>
                      </Link>
                    </Button>
                  ) : (
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                    >
                      <Link href="/auth/login">
                        <span>Sign In</span>
                      </Link>
                    </Button>
                  )}
                  
                  <Button
                    asChild
                    size="sm"
                  >
                    <Link href="/auth/signup">
                      <span>Join Club</span>
                    </Link>
                  </Button>
                  <ModeToggle />
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
