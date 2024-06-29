import { useState } from "react";
// import { UploadButton, UploadDropzone } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import Image from 'next/image';
import { UploadDropzone } from "@/utils/uploadthing";


export default function Uploadthing() {
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState<string | null>("");

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <UploadDropzone
       appearance={
        {
        container:{
              border:'1px dotted blue',
            

        },
        uploadIcon:{
          color:'blue',
          width:300,
          height:150,
        },  

        }
       }
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          console.log("Files: ", res);
          // Update state with the URLs of the uploaded files
          setUploadedFiles(res.map(file => file.url));
          setImageUrl(res[0].url);
          console.log("URL: ", res[0].url);
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />
            {imageUrl?.length    && 
            <div>
            <Image src={imageUrl}
            alt="Uploaded Image" 
            className=" object-cover border rounded m-3" 
            width={300} height={150}/>
            </div>
            }
    </main>
  );
}
