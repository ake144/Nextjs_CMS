"use client";

import Image from "next/image";
import { useState } from "react";
import { Cloudinary } from "@cloudinary/url-gen";


const cld = new Cloudinary({
  cloud: {
    cloudName:process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME , // Replace with your Cloudinary cloud name
  },
});




export default function ImageGen() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [model, setModel] = useState("CompVis/stable-diffusion-v1-4");
  const [publicId, setPublicId] = useState(null); 
  const [transformedImageUrl, setTransformedImageUrl] = useState<any>(null);




  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setImageUrl(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt, model }),
      });

      const data = await res.json();
      if (res.status === 200) {
        setImageUrl(data.imageUrl);
        setPublicId(data.publicId);
        setTransformedImageUrl(null); 
      } else {
        setError(data.message);
      }
    } catch (error: any) {
      console.error("Error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = () => {
    const link = document.createElement("a");
    link.href = transformedImageUrl || imageUrl;
    link.download = "generated-image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const transformImage = (transformation:any) => {
    // const url = new URL(imageUrl);
    // url.pathname = `/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${transformation}/${url.pathname.split('/').pop()}`;
    // setImageUrl(url.href);
  
    if (!publicId) return;
    const myImage = cld.image(publicId);
    transformation(myImage);
    // setImageUrl(myImage.toURL());
    setTransformedImageUrl(myImage.toURL());
  
  
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="mt-8 mx-8 justify-center items-center">
        <h1>Image Generator</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4  dark:text-black text-white ">
            <label className="block mb-2">
              <input
                type="radio"
                value="CompVis/stable-diffusion-v1-4"
                checked={model === "CompVis/stable-diffusion-v1-4"}
                onChange={() => setModel("CompVis/stable-diffusion-v1-4")}
              />
              CompVis/stable-diffusion-v1-4
            </label>
            <label className="block mb-2">
              <input
                type="radio"
                value="stabilityai/stable-diffusion-xl-base-1.0"
                checked={model === "stabilityai/stable-diffusion-xl-base-1.0"}
                onChange={() => setModel("stabilityai/stable-diffusion-xl-base-1.0")}
              />
              stabilityai/stable-diffusion-xl-base-1.0
            </label>
            <label>
              <input
                type="radio"
                value="runwayml/stable-diffusion-v1-5"
                checked={model === "runwayml/stable-diffusion-v1-5"}
                onChange={() => setModel("runwayml/stable-diffusion-v1-5")}
              />
              runwayml/stable-diffusion-v1-5
            </label>
          </div>
          <textarea
            className="w-full p-2 mb-4 border rounded"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt"
            required
          ></textarea>
          <button
            className="px-4 py-2 text-white bg-blue-500 rounded"
            type="submit"
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Content"}
          </button>
        </form>
        {error && <p className="mt-4 text-red-500">{error}</p>}
        {imageUrl && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Generated Image</h2>
            <Image src={transformedImageUrl || imageUrl} alt="Generated Image" width={500} height={500} className="mb-4" />
            <button
              className="px-4 py-2 text-white bg-green-500 rounded mb-4"
              onClick={downloadImage}
            >
              Download Image
            </button>
           
          </div>
        )}
      </div>
    </main>
  );
}