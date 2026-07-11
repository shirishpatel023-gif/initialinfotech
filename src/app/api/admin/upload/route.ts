import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { getSession } from "@/lib/auth";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  // 1. Authenticate user session
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // 2. Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Only JPEG, PNG, and WebP are allowed." },
        { status: 400 }
      );
    }

    // 3. Validate size (Max 4MB)
    if (file.size > 4 * 1024 * 1024) {
      return NextResponse.json({ error: "File size exceeds 4MB limit." }, { status: 400 });
    }

    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const filename = `employee-${uniqueSuffix}-${file.name.replace(/\s+/g, "_")}`;

    // 4. Check for Vercel Blob Token
    const hasBlobToken = Boolean(process.env.BLOB_READ_WRITE_TOKEN);

    if (hasBlobToken) {
      // Production path: Upload to Vercel Blob
      const blob = await put(filename, file, {
        access: "public",
      });
      return NextResponse.json({ url: blob.url });
    } else {
      // If we are on Vercel and token is missing, throw a friendly configuration error
      if (process.env.VERCEL) {
        return NextResponse.json(
          { error: "Vercel Blob: BLOB_READ_WRITE_TOKEN is missing in Vercel project settings." },
          { status: 400 }
        );
      }

      // Fallback local path (local development only): Save to public/uploads/employees
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      const uploadDir = path.join(process.cwd(), "public", "uploads", "employees");
      
      // Ensure folder exists
      await mkdir(uploadDir, { recursive: true });
      
      const filePath = path.join(uploadDir, filename);
      await writeFile(filePath, buffer);

      // Return relative URL served by Next.js static asset server
      const relativeUrl = `/uploads/employees/${filename}`;
      return NextResponse.json({ url: relativeUrl });
    }
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Upload failed" },
      { status: 500 }
    );
  }
}
