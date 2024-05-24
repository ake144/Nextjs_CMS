import { useState } from "react";
import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import Image from 'next/image';

export default function Uploadthing() {
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <UploadButton<OurFileRouter, "imageUploader">
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          console.log("Files: ", res);
          // Update state with the URLs of the uploaded files
          setUploadedFiles(res.map(file => file.url));

          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />
      {uploadedFiles.length > 0 && (
        <div className="mt-4">
          <h2>Uploaded Files:</h2>
          <div className="flex flex-wrap gap-4">
            {uploadedFiles.map((file, index) => (
              <div key={index} className="w-32 h-32 relative">
                <Image
                  src={file}
                  alt={`Uploaded file ${index + 1}`}
                  className="ml-4 w-32 h-32 object-cover border rounded"
                  width={32}
                  height={32}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
