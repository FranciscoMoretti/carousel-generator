# 🚀 Carousel with Images Test Template

<!--
This markdown template demonstrates how to use images in carousel slides.
The parser supports two types of images:
1. Background images: Add "background" in the alt text, or place at the start of a slide
2. Content images: Regular markdown images that appear as content elements

This template works with both AI-enhanced and direct (no-AI) parsing modes!
-->

## 📸 Background Image Syntax

![background](https://images.unsplash.com/photo-1557683316-973673baf926?w=800)

You can add background images using markdown syntax with "background" in the alt text. These will appear behind your content with reduced opacity.

## 🖼️ Content Image Example

![Product showcase](https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600)

### Beautiful Product Photos

Regular markdown images become content elements in your slides. Perfect for showcasing products, screenshots, or illustrations.

## 🎨 Combined: Background + Content

![background mountain scene](https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800)

### Nature & Technology

![Laptop on desk](https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600)

You can combine both background and content images in the same slide for stunning visual effects!

## 📱 Multiple Slides with Images

### Slide 1: Mobile Design

![Smartphone mockup](https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600)

- Clean interface design
- User-friendly navigation
- Responsive layouts

### Slide 2: Desktop Experience

![Desktop workspace](https://images.unsplash.com/photo-1547658719-da2b51169166?w=600)

- Professional workflows
- Powerful features
- Seamless collaboration

## 🔥 Image Types Supported

The markdown parser supports various image URL formats:

1. **HTTPS URLs** - Direct links to images
2. **Unsplash URLs** - High-quality stock photos
3. **Data URLs** - Base64 encoded images (for uploaded files)
4. **Placeholder URLs** - Testing with placehold.co or similar services

## ⚙️ How It Works

The carousel generator provides **three conversion modes**:

### 1. Pure Parsing (No AI)
**Function:** `parseMarkdownToSlides(markdown)`
- Parses markdown into structured slide data
- Returns: `{ slides: MarkdownSlide[], metadata: {...} }`
- No API key required
- Perfect for understanding the structure

### 2. Direct Conversion (No AI)
**Function:** `convertMarkdownToCarouselSlides(markdown)`
- Converts markdown directly to carousel format
- No AI enhancement - pure markdown parsing
- No API key required
- Fast and reliable
- Use via: `generateCarouselFromMarkdownDirectAction()`

### 3. AI-Enhanced Conversion
**Function:** `generateCarouselFromMarkdown(markdown, apiKey)`
- Uses AI to enhance and optimize content
- Adds emojis and improves text
- Requires OpenAI API key
- Best for polished results
- Use via: `generateCarouselFromMarkdownAction()`

## 🎛️ API Functions

### Client-Side (No API Key)
```typescript
await generateCarouselFromMarkdownDirectAction(markdownContent)
```
- Works without OpenAI API key
- Pure markdown parsing
- Instant results
- Great for testing and prototyping

### AI-Enhanced (Requires API Key)
```typescript
await generateCarouselFromMarkdownAction(markdownContent)
```
- Requires `OPENAI_API_KEY` environment variable
- AI optimizes content and adds emojis
- Rate limiting applied (if configured)
- Best for production use

### When to Use Which?

| Feature | Direct Mode | AI Mode |
|---------|------------|---------|
| API Key Required | ❌ No | ✅ Yes |
| Speed | ⚡ Instant | 🐢 2-5 seconds |
| Content Enhancement | ❌ No | ✅ Yes |
| Emoji Addition | ❌ Manual | ✅ Automatic |
| Cost | 💰 Free | 💰 API costs |
| Best For | Testing, Prototyping | Production, Polish |

## 🎯 Best Practices

### Use High-Quality Images

![high quality photo example](https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600)

- Optimal resolution: 1920x1080 or higher
- Use web-optimized formats (JPEG, PNG, WebP)
- Keep file sizes reasonable for loading speed

### Alt Text Matters

![background abstract pattern](https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=800)

- Use "background" keyword for background images
- Descriptive alt text for content images
- Helps with accessibility and parsing logic

## 🌟 Testing Edge Cases

### Empty Background Image

![background]()

This slide has an empty background image URL - should handle gracefully.

### Very Long Image URL

![Product](https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80&fit=crop&auto=format&ixlib=rb-4.0.3)

Long URLs with query parameters should work correctly.

## 💡 Placeholder Images

![placeholder content](https://placehold.co/600x400/png?text=Your+Image+Here)

### Perfect for Prototyping

Use placeholder services while you prepare final assets.

- Quick mockups
- Design iterations
- Client presentations

## 🏁 Conclusion

![background celebration](https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800)

### Ready to Create!

Now you know how to add both background and content images to your carousel slides using simple markdown syntax. Happy creating! ✨
