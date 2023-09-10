import { Icons } from "@/components/icons";

export function SiteFooter() {
  return (
    <footer className="border-t border-t-secondary w-full">
      <div className="flex container flex-col items-center justify-between gap-4 md:flex-row py-4  ">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Icons.logo />
          <p className="text-center text-sm leading-loose md:text-left">
            Built by{" "}
            <a
              href={"https://twitter.com/franmoretti_"}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              franmoretti_
            </a>
            . Posting progress on{" "}
            <a
              href="https://www.linkedin.com/in/franciscomoretti/"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              LinkedIn
            </a>
            .
          </p>
        </div>
        <p className="text-center text-sm md:text-left">
          The source code is available on{" "}
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
