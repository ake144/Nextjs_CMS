import { NextApiRequest, NextApiResponse } from 'next';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { stat } from 'fs';
import { NextRequest, NextResponse } from 'next/server';

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error('GEMINI_API_KEY environment variable is not set');
}

const systemInstruction = `
  You are an expert in content creation. Create a well-structured, professional, and engaging blog post for the given title. Ensure the content includes an introduction, main sections with subheadings, and a conclusion. The tone should be informative and accessible, suitable for a broad audience.
`;

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction 
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
