import { TypographyH3 } from "@/components/typography";
import { Sparkles } from "lucide-react";
import { AIInputForm } from "@/components/ai-input-form";
import { AIUrlForm } from "@/components/ai-url-form";
import { Separator } from "@/components/ui/separator";

export function AIPanel() {
  return (
    <div className="flex flex-col gap-4 w-full items-center">
      <TypographyH3 className="flex flex-row items-center gap-2">
        <Sparkles className="w-6 h-6" /> AI 카드뉴스 생성
      </TypographyH3>
      <AIUrlForm />
      <div className="flex items-center gap-4 w-full max-w-lg">
        <Separator className="flex-1" />
        <span className="text-sm text-muted-foreground">또는</span>
        <Separator className="flex-1" />
      </div>
      <AIInputForm />
    </div>
  );
}
