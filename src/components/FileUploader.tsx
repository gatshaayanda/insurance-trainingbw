// src/components/FileUploader.tsx
"use client";

import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";

export function FileUploader({
  onUploadComplete,
}: {
  onUploadComplete?: (url: string) => void;
}) {
  return (
    <UploadButton<OurFileRouter, "fileUploader">
      endpoint="fileUploader"
      onClientUploadComplete={(res) => {
        if (res && res[0]) {
          const url = res[0].url;
          console.log("File uploaded:", url);
          onUploadComplete?.(url);
        }
      }}
      onUploadError={(error: Error) => {
        console.error("Upload failed:", error);
        alert(`Upload failed: ${error.message}`);
      }}
    />
  );
}
