"use client";

import * as React from "react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";

export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
};

export type MainNavItem = NavItem;

interface MainNavProps {
  items?: MainNavItem[];
  className?: string;
}

export function MainNav({ items, className }: MainNavProps) {
  const segment = useSelectedLayoutSegment();

  return (
    <div className={cn("flex gap-6 md:gap-10", className)}>
      <Link href="/" className="items-center space-x-2 flex">
        <Icons.logo />
        <span className="font-bold inline-block">Carousel Generator</span>
      </Link>
      {items?.length ? (
        <nav className="gap-6 flex">
          {items?.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? "#" : item.href}
              className={cn(
                "flex items-center text-lg font-semibold hover:text-foreground/80 sm:text-sm",
                item.href.startsWith(`/${segment}`)
                  ? "text-foreground"
                  : "text-foreground/60",
                item.disabled && "cursor-not-allowed opacity-80"
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      ) : null}
    </div>
  );
}
