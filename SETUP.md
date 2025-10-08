# Carousel Generator Setup Guide

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

### 3. Add Your OpenAI API Key (Optional)

**Optional: Only needed for AI-enhanced carousel generation with the "Quick Prompt" feature**

The "From Markdown" feature works without any API key! If you want AI enhancement for the quick prompt feature:

1. Get your API key from [OpenAI Platform](https://platform.openai.com/account/api-keys)
2. Open `.env.local` and add your key:

```env
OPENAI_API_KEY="sk-your-actual-api-key-here"
```

⚠️ **Important**: Never commit `.env.local` to version control!

💡 **Tip**: You can skip this step and use markdown-to-carousel conversion immediately!

### 4. Start the Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to use the app.

## Features

### Carousel Generation

The app offers two ways to generate carousels:

#### 1. Quick Prompt (Requires OpenAI API Key)
- Simple text input
- Example: "5 tips for productivity"
- AI generates complete carousel from scratch
- ⚠️ Requires `OPENAI_API_KEY` in `.env.local`

#### 2. From Markdown (No API Key Required!)
- Paste markdown content or upload `.md` files
- **Works immediately** - no API key needed!
- Directly converts your markdown structure into carousel slides
- Supports:
  - Headings (H1, H2, H3) → Titles and subtitles
  - Lists and paragraphs → Descriptions
  - Images → Background and content images
  - Automatic slide organization

### Brand Templates

Save time with pre-configured brand templates:

1. **Templates Tab** in sidebar → Choose from 8 built-in templates
2. **Apply Template** to instantly style your carousel
3. **Save Current** to create your own reusable templates
4. **Export/Import** to share templates across projects

Available templates:
- Professional
- Creative
- Minimal
- Vibrant
- Elegant
- Nature
- Tech
- Warm

## Troubleshooting

### "Failed to generate carousel" with Quick Prompt

**Cause**: Missing or invalid OpenAI API key

**Solution**:
1. The "Quick Prompt" feature requires an OpenAI API key
2. Either add `OPENAI_API_KEY` to `.env.local` or
3. **Use the "From Markdown" tab instead** (no API key required!)

### Markdown conversion not working

**Solution**:
1. Ensure your markdown has proper formatting (headings with `#`, `##`, `###`)
2. Make sure markdown is at least 10 characters
3. Try the example markdown below

### Rate Limiting (Optional)

To enable rate limiting, add Vercel KV credentials to `.env.local`:

```env
KV_REST_API_URL="your-kv-url"
KV_REST_API_TOKEN="your-kv-token"
```

Get these from [Vercel KV](https://vercel.com/docs/storage/vercel-kv/quickstart)

## Example Markdown

Try this markdown in the "From Markdown" tab:

```markdown
# Amazing Product Launch

## The Problem
- Users struggle with complex tools
- Too many steps to get started
- No clear guidance

## Our Solution
A simple, intuitive platform that just works

## Key Features
- One-click setup
- Beautiful design
- 24/7 support

## Get Started Today
Visit our website and start your free trial
```

## Need Help?

- Check the [original README](./README.md) for more details
- Open an issue on GitHub
- Review the code in `src/` directory

Happy carousel creating! 🎨✨
