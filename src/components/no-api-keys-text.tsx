import { BringYourKeysDialog } from "@/components/api-keys-dialog";
import { TypographyExternalLink } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Settings } from "lucide-react";

export function NoApiKeysText() {
  return (
    <p className="text-center">
      Please enter your{" "}
      <TypographyExternalLink href="https://openai.com/product">
        OpenAI API key
      </TypographyExternalLink>{" "}
      in
      <BringYourKeysDialog
        triggerButton={
          <Button variant="link" className="px-2">
            <span className={cn("flex flex-row gap-2 items-center")}>
              {"Settings"} <Settings className="w-3 h-3" />
            </span>
          </Button>
        }
      />
      .
    </p>
  );
}
