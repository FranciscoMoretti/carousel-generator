import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    let url = new URL(request.url);
    let imageUrl = url.searchParams.get("url");

    if (!imageUrl) {
      return new NextResponse("URL Not provided", { status: 500 });
    }

    // Make a GET request to the external URL
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const headers = new Headers();

    headers.set("Content-Type", "image/*");
    // Return the response as-is
    return new NextResponse(blob, { status: 200, statusText: "OK", headers });
  } catch (error) {
    // Handle errors gracefully
    console.error("Proxy error:", error);
    return new NextResponse("Proxy error", {
      status: 500,
      headers: { "Content-Type": "text/plain" },
    });
  }
}
