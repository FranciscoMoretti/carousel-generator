import { Icons } from "@/components/icons";

export function SiteFooter() {
  return (
    <footer className="border-t border-t-secondary w-full">
      <div className="flex container flex-col items-center justify-center gap-2 md:flex-row py-4  ">
        <div className="flex flex-col items-center md:flex-row gap-2 ">
          <Icons.logo className="hidden md:block" />
          <p className="text-center text-xs md:text-sm leading-loose md:text-left ">
            Built by{" "}
            <a
              href={"https://twitter.com/franmoretti_"}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              franmoretti_
            </a>
          </p>
        </div>
        <p className="text-center text-xs md:text-sm md:text-left">
          Code on{" "}
          <a
            href={"https://github.com/FranciscoMoretti/carousel-generator"}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
