"use client";

import Editor from "@/components/editor";
import { DocumentProvider } from "@/lib/providers/document-provider";

export default function Home() {
  return (
    <main className="">
      <DocumentProvider>
        <Editor />
      </DocumentProvider>
    </main>
  );
}
