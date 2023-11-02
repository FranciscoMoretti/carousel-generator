import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge"; // 'nodejs' is the default

export async function GET(request: NextRequest) {
  try {
    let url = new URL(request.url);
    let imageUrl = url.searchParams.get("url");

    if (!imageUrl) {
      return new NextResponse("URL Not provided", { status: 500 });
    }
    const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "";

    // Make a GET request to the external URL
    const { contentType, body } = await fetchExternalImageUrl(imageUrl);

    if (
      !(typeof contentType === "string") ||
      !contentType.startsWith("image")
    ) {
      return new NextResponse("Content type must be image", { status: 500 });
    }

    const headers = new Headers();
    headers.set("Access-Control-Allow-Origin", siteUrl);
    headers.set("Content-Type", contentType);
    // Return the response as-is
    return new NextResponse(body, {
      status: 200,
      statusText: "OK",
      headers,
    });
  } catch (error) {
    // Handle errors gracefully
    console.error("Proxy error:", error);
    return new NextResponse("Proxy error", {
      status: 500,
      headers: { "Content-Type": "text/plain" },
    });
  }
}

async function fetchExternalImageUrl(imageUrl: string) {
  // TODO: Convert to server action
  const response = await fetch(imageUrl);
  const contentType = response.headers.get("Content-Type");
  if (typeof contentType === "string" && contentType.startsWith("image")) {
    response.body;
  }
  return { contentType, body: response.body };
}
