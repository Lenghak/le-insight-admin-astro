import { buttonVariants } from "@/common/components/ui/button";

import { cn } from "@/common/lib/utils";

import { Card, CardContent } from "@ui/card";

import Logo from "@custom/logo";

import type { HTMLAttributes } from "react";
import { Link } from "react-router-dom";

type FooterShortProps = HTMLAttributes<HTMLDivElement>;

const links = [
  {
    label: "Terms of use",
    link: "/terms",
  },
  {
    label: "Privacy policies",
    link: "/privacy",
  },
  {
    label: "Cookies policies",
    link: "/cookies",
  },
  {
    label: "About",
    link: "/about",
  },
  {
    label: "Newsletter",
    link: "/newsletter",
  },
];

export default function FooterShort({ className, ...props }: FooterShortProps) {
  return (
    <Card
      className={cn("w-full", className)}
      {...props}
    >
      <CardContent className="px-12 py-2">
        <footer className="flex w-full items-center justify-between">
          <Link to={"/"}>
            <Logo
              spa
              className="size-12 min-h-12 min-w-12"
            />
          </Link>

          <nav className="flex items-start justify-end">
            {links.map((link) => (
              <a
                key={link.link}
                href={link.link}
                className={cn(buttonVariants({ variant: "link" }), "font-bold")}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </footer>
      </CardContent>
    </Card>
  );
}
