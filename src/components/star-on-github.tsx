"use client";

import Link from "next/link";
import { StarIcon } from "lucide-react";

import { Icons } from "./icons";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export function StarOnGithub() {
  return (
    <div className={cn("mx-2 hidden lg:block")}>
      <Link
        className={cn(
          buttonVariants(),
          "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          "group relative flex w-full justify-start gap-2 overflow-hidden whitespace-pre rounded-sm",
          "hover:ring-2 hover:ring-primary hover:ring-offset-2",
          "transition-all duration-300 ease-out"
        )}
        target="_blank"
        href={"https://github.com/FranciscoMoretti/carousel-generator"}
      >
        <span
          className={cn(
            "absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12",
            "bg-white opacity-10",
            "transition-all duration-1000 ease-out ",
            cn("group-hover:translate-x-[-135px]")
          )}
        />
        <Icons.gitHub className="h-4 w-4" />
        Star on GitHub
        <div className="hidden items-center gap-1 text-sm text-muted-foreground md:flex">
          <StarIcon className="h-4 w-4 transition-all duration-300 group-hover:text-[#e3b341]" />
          {/* //TODO: Consider adding star counter with github api */}
        </div>
      </Link>
    </div>
  );
}
