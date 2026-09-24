import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "demo",
  api_key: process.env.CLOUDINARY_API_KEY || "demo_key",
  api_secret: process.env.CLOUDINARY_API_SECRET || "demo_secret",
  secure: true,
});

export default cloudinary;

/**
 * Uploads a base64 or file buffer to Cloudinary
 */
export async function uploadToCloudinary(
  fileBase64: string,
  folder: string = "bites_restaurant"
): Promise<{ url: string; publicId: string }> {
  try {
    const isCloudinaryConfigured =
      Boolean(process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) &&
      Boolean(process.env.CLOUDINARY_API_KEY) &&
      Boolean(process.env.CLOUDINARY_API_SECRET);

    if (!isCloudinaryConfigured) {
      // In local dev without credentials, return the base64 or mock image URL safely
      console.warn("Cloudinary credentials not set in environment. Returning fallback URL.");
      return {
        url: fileBase64.startsWith("data:")
          ? fileBase64
          : "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80",
        publicId: `mock_${Date.now()}`,
      };
    }

    const uploadResponse = await cloudinary.uploader.upload(fileBase64, {
      folder,
      resource_type: "auto",
    });

    return {
      url: uploadResponse.secure_url,
      publicId: uploadResponse.public_id,
    };
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw error;
  }
}
