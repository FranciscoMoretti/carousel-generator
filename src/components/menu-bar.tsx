import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: string[];
  selectedForm: string;
  setSelectedForm: (form: string) => void;
}

export function SidebarMenu({
  className,
  items,
  selectedForm,
  setSelectedForm,
  ...props
}: SidebarNavProps) {
  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <button
          key={item}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            selectedForm == item
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-start"
          )}
          onClick={() => setSelectedForm(item)}
        >
          {item}
        </button>
      ))}
    </nav>
  );
}
