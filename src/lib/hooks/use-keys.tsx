import { FocusEvent, useState } from "react";

export function useKeys() {
  const [apiKey, setApiKey] = useState<string>(
    process.env.NEXT_PUBLIC_OPENAI_KEY || ""
  );

  return {
    apiKey,
    setApiKey,
  };
}
