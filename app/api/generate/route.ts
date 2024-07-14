import { HfInference } from "@huggingface/inference";
import { NextResponse } from 'next/server';

const HF_TOKEN = process.env.NEXT_HUGGING_FACE_TOKEN;
const inference = new HfInference(HF_TOKEN);

export async function POST(req: Request) {
  try {
    const { prompt, model } = await req.json();

    // Increased timeout duration
    const response = await inference.textToImage({
      model: model,
      inputs: prompt,
      parameters: {
        height: 512,
        width: 512,
      },
    });

    const arrayBuffer = await response.arrayBuffer();
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/dyjxu2txs/image/upload`;
    const cloudinaryApiKey = process.env.CLOUDINARY_API_KEY;
    const cloudinaryApiSecret = process.env.CLOUDINARY_API_SECRET;

    const formData = new FormData();
    formData.append("file", new Blob([arrayBuffer]));
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME || '');

    const uploadResponse = await fetch(cloudinaryUrl, {
      method: "POST",
      body: formData,
      headers: {
        "Authorization": `Basic ${btoa(`${cloudinaryApiKey}:${cloudinaryApiSecret}`)}`
      }
    });

    if (uploadResponse.ok) {
      const uploadData = await uploadResponse.json();
      const imageUrl = uploadData.secure_url;
      return NextResponse.json({ imageUrl }, { status: 200 });
    } else {
      throw new Error("Failed to upload image to Cloudinary");
    }
  } catch (error: any) {
    console.error("Error:", error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
