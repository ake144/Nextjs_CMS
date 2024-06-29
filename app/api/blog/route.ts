import { NextApiRequest, NextApiResponse } from 'next';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { stat } from 'fs';
import { NextRequest, NextResponse } from 'next/server';

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error('GEMINI_API_KEY environment variable is not set');
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: "You are an expert in content creation. Create SEO and high-quality plain text content using the given slug or title.",
});

const generationConfig = {
  temperature: 0.5,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export  async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
  console.log('Prompt:', prompt);
    if (!prompt) {
    return  NextResponse.json({ message: 'Prompt is required' , status: 400})
    }

    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    });

    const result = await chatSession.sendMessage(prompt);

    return NextResponse.json(({ message: result.response.text()}));
  } catch (error: any) {
    console.error('Error generating content:', error);
    return NextResponse.json({ message: error.message});
  }
}
