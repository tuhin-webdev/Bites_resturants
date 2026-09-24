import { NextRequest, NextResponse } from "next/server";
import { uploadToCloudinary } from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      const { image, folder } = await req.json();
      if (!image) {
        return NextResponse.json({ error: "No image provided" }, { status: 400 });
      }

      const result = await uploadToCloudinary(image, folder || "bites_restaurant");
      return NextResponse.json({ success: true, url: result.url, publicId: result.publicId });
    }

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const file = formData.get("file") as File | null;
      const folder = (formData.get("folder") as string) || "bites_restaurant";

      if (!file) {
        return NextResponse.json({ error: "No file attached" }, { status: 400 });
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64Data = `data:${file.type};base64,${buffer.toString("base64")}`;

      const result = await uploadToCloudinary(base64Data, folder);
      return NextResponse.json({ success: true, url: result.url, publicId: result.publicId });
    }

    return NextResponse.json({ error: "Unsupported content type" }, { status: 400 });
  } catch (error: any) {
    console.error("Upload API error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to upload image" },
      { status: 500 }
    );
  }
}
