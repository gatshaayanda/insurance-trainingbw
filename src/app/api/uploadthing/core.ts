// src/app/api/uploadthing/core.ts
import { createUploadthing, type FileRouter } from 'uploadthing/server'

const f = createUploadthing()

export const ourFileRouter = {
  fileUploader: f({ 
    image: { maxFileSize: "4MB" }, 
    pdf: { maxFileSize: "4MB" } 
  }).onUploadComplete(async ({ file }) => {
    console.log("✅ Uploaded file:", file)
  }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter;
