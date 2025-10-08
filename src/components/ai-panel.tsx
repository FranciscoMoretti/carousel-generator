"use client";

import { TypographyH3 } from "@/components/typography";
import { FileText, Sparkles, Zap } from "lucide-react";
import { NoApiKeysText } from "./no-api-keys-text";
import { useKeysContext } from "@/lib/providers/keys-context";
import { AIInputForm } from "@/components/ai-input-form";
import { AITextAreaForm } from "@/components/ai-textarea-form";
import { MarkdownInputForm } from "@/components/markdown-input-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

export function AIPanel() {
  // const { apiKey } = useKeysContext();
  const apiKey = true; // TODO: Re-enable local keys
  const [activeTab, setActiveTab] = useState("quick");

  return (
    <div className="flex flex-col gap-4 w-full items-center">
      <TypographyH3 className="flex flex-row items-center gap-2">
        <Sparkles className="w-6 h-6" /> Generate with AI
      </TypographyH3>
      {apiKey ? (
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full max-w-2xl"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="quick" className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Quick Prompt
            </TabsTrigger>
            <TabsTrigger value="markdown" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              From Markdown
            </TabsTrigger>
          </TabsList>
          <TabsContent value="quick" className="mt-4">
            <AIInputForm />
          </TabsContent>
          <TabsContent value="markdown" className="mt-4">
            <MarkdownInputForm />
          </TabsContent>
        </Tabs>
      ) : (
        <NoApiKeysText />
      )}
    </div>
  );
}
