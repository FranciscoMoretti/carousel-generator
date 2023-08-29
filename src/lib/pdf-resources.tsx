export const PAGE_SIZE = [300, 375];
import { createTw } from "react-pdf-tailwind";

// The 'theme' object is your Tailwind theme config
export const tw = createTw({
  theme: {
    extend: {
      colors: {
        custom: "#bada55", // TODO: Use this class to style components with tailwind (primary, secondary, etc)
      },
    },
  },
});
