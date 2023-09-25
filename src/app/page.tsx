"use client";

import Editor from "@/components/editor";
import { DocumentProvider } from "@/lib/providers/document-provider";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col w-full items-stretch justify-between my-4 md:pr-4">
      <DocumentProvider>
        <Editor />
      </DocumentProvider>
    </main>
  );
}
