import { TypographyH3 } from "@/components/typography";
import { Sparkles } from "lucide-react";
import { NoApiKeysText } from "./no-api-keys-text";
import { useKeysContext } from "@/lib/providers/keys-context";
import { AIInputForm } from "@/components/ai-input-form";
import { AITextAreaForm } from "@/components/ai-textarea-form";

export function AIPanel() {
  // const { apiKey } = useKeysContext();
  const apiKey = true; // TODO: Re-enable local keys
  return (
    <div className="flex flex-col gap-2 w-full items-center">
      <TypographyH3 className="flex flex-row items-center gap-2">
        <Sparkles className="w-6 h-6" /> Generate with AI
      </TypographyH3>
      {apiKey ? (
        <>
          <AIInputForm />
          {/* // TODO: Improve article to carousel conversion */}
          {/* <AITextAreaForm /> */}
        </>
      ) : (
        <NoApiKeysText />
      )}
    </div>
  );
}
