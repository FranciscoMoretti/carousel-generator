/**
 * Markdown Parser for Carousel Generation
 * Converts markdown content into structured carousel slides
 */

export interface MarkdownSlide {
  type: "intro" | "content" | "outro";
  title?: string;
  subtitle?: string;
  description?: string;
  backgroundImage?: string;
  contentImage?: string;
}

export interface ParsedMarkdown {
  slides: MarkdownSlide[];
  metadata: {
    totalSlides: number;
    hasTitle: boolean;
  };
}

/**
 * Parse markdown content into carousel slides
 */
export function parseMarkdownToSlides(markdown: string): ParsedMarkdown {
  const lines = markdown.split("\n").filter((line) => line.trim());

  const slides: MarkdownSlide[] = [];
  let currentSlide: MarkdownSlide | null = null;
  let isFirstSlide = true;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Markdown image syntax: ![alt](url)
    const imageMatch = line.match(/!\[([^\]]*)\]\(([^)]+)\)/);
    if (imageMatch) {
      const altText = imageMatch[1].trim();
      const imageUrl = imageMatch[2].trim();

      // Check if this is a background image (has "background" in alt text or is first element)
      const isBackgroundImage = altText.toLowerCase().includes("background") ||
                                (!currentSlide || (!currentSlide.title && !currentSlide.subtitle && !currentSlide.description));

      if (isBackgroundImage) {
        // This is a background image
        if (!currentSlide) {
          currentSlide = { type: "content" };
        }
        currentSlide.backgroundImage = imageUrl;
      } else {
        // This is a content image
        if (!currentSlide) {
          currentSlide = { type: "content" };
        }
        currentSlide.contentImage = imageUrl;
      }
      continue;
    }

    // H1 headings - Create intro/outro slides
    if (line.startsWith("# ")) {
      if (currentSlide) {
        slides.push(currentSlide);
      }
      const title = line.substring(2).trim();
      currentSlide = {
        type: isFirstSlide ? "intro" : "content",
        title: truncateText(title, 60),
      };
      isFirstSlide = false;
    }
    // H2 headings - Create content slides with title
    else if (line.startsWith("## ")) {
      if (currentSlide) {
        slides.push(currentSlide);
      }
      const title = line.substring(3).trim();
      currentSlide = {
        type: "content",
        title: truncateText(title, 60),
      };
    }
    // H3 headings - Add as subtitle to current slide
    else if (line.startsWith("### ")) {
      const subtitle = line.substring(4).trim();
      if (currentSlide) {
        currentSlide.subtitle = truncateText(subtitle, 80);
      } else {
        currentSlide = {
          type: "content",
          subtitle: truncateText(subtitle, 80),
        };
      }
    }
    // List items - Add as description (combine multiple items)
    else if (line.match(/^[-*+]\s/)) {
      const text = line.replace(/^[-*+]\s/, "").trim();
      if (currentSlide) {
        if (currentSlide.description) {
          currentSlide.description += "\n• " + text;
        } else {
          currentSlide.description = "• " + text;
        }
      } else {
        currentSlide = {
          type: "content",
          description: "• " + text,
        };
      }
    }
    // Numbered lists
    else if (line.match(/^\d+\.\s/)) {
      const text = line.replace(/^\d+\.\s/, "").trim();
      if (currentSlide) {
        if (currentSlide.description) {
          currentSlide.description += "\n" + text;
        } else {
          currentSlide.description = text;
        }
      } else {
        currentSlide = {
          type: "content",
          description: text,
        };
      }
    }
    // Regular paragraphs - Add as description
    else if (line && !line.startsWith(">") && !line.startsWith("```")) {
      const text = line.trim();
      if (text.length > 10) {
        // Avoid very short lines
        if (currentSlide) {
          if (!currentSlide.description) {
            currentSlide.description = truncateText(text, 150);
          }
        } else {
          currentSlide = {
            type: "content",
            description: truncateText(text, 150),
          };
        }
      }
    }

    // If description is getting too long, start a new slide
    if (currentSlide && currentSlide.description && currentSlide.description.length > 200) {
      slides.push(currentSlide);
      currentSlide = null;
    }
  }

  // Add the last slide
  if (currentSlide) {
    slides.push(currentSlide);
  }

  // Mark last slide as outro if there are multiple slides
  if (slides.length > 1) {
    slides[slides.length - 1].type = "outro";
  }

  // Ensure we have at least one slide
  if (slides.length === 0) {
    slides.push({
      type: "intro",
      title: "Untitled Carousel",
      description: "Add your content here",
    });
  }

  return {
    slides,
    metadata: {
      totalSlides: slides.length,
      hasTitle: slides.length > 0 && !!slides[0].title,
    },
  };
}

/**
 * Truncate text to max length, preserving whole words
 */
function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }

  const truncated = text.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(" ");

  if (lastSpace > 0) {
    return truncated.substring(0, lastSpace) + "...";
  }

  return truncated + "...";
}

/**
 * Extract title from markdown (first H1)
 */
export function extractMarkdownTitle(markdown: string): string | null {
  const lines = markdown.split("\n");
  for (const line of lines) {
    if (line.trim().startsWith("# ")) {
      return line.substring(2).trim();
    }
  }
  return null;
}

/**
 * Count slides that would be generated from markdown
 */
export function countMarkdownSlides(markdown: string): number {
  return parseMarkdownToSlides(markdown).metadata.totalSlides;
}

/**
 * Convert markdown directly to carousel slides (no AI required)
 * Returns slides in the format expected by the carousel editor
 */
export function convertMarkdownToCarouselSlides(markdown: string): any[] {
  const parsed = parseMarkdownToSlides(markdown);

  return parsed.slides.map((slide) => {
    const elements: any[] = [];

    // Add title if present
    if (slide.title) {
      elements.push({
        type: "Title",
        text: slide.title,
        style: {
          fontSize: "Medium",
          align: "Left",
        },
      });
    }

    // Add subtitle if present
    if (slide.subtitle) {
      elements.push({
        type: "Subtitle",
        text: slide.subtitle,
        style: {
          fontSize: "Medium",
          align: "Left",
        },
      });
    }

    // Add description if present
    if (slide.description) {
      elements.push({
        type: "Description",
        text: slide.description,
        style: {
          fontSize: "Medium",
          align: "Left",
        },
      });
    }

    // Add content image if present
    if (slide.contentImage) {
      elements.push({
        type: "ContentImage",
        source: {
          src: slide.contentImage,
          type: "URL",
        },
        style: {
          opacity: 100,
          objectFit: "Cover",
        },
      });
    }

    // Build the slide object
    const carouselSlide: any = {
      elements,
      backgroundImage: {
        type: "Image",
        source: {
          src: "",
          type: "URL",
        },
        style: {
          opacity: 30,
        },
      },
    };

    // Add background image if present
    if (slide.backgroundImage) {
      carouselSlide.backgroundImage.source.src = slide.backgroundImage;
    }

    return carouselSlide;
  });
}
