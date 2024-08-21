'use client';

import { Dispatch, SetStateAction, useState, useCallback } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

interface GeneratePostProps {
  setAiGeneratedContent: Dispatch<SetStateAction<string>>;
}

export default function GeneratePost({ setAiGeneratedContent }: GeneratePostProps) {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const formMethods = useForm({
    defaultValues: {
      title: "",
      featureImage: "",
      description: "",
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      if (res.ok) {
        setAiGeneratedContent(data.message);
      }
    } catch (error: any) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
      <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-100">
        <div className="w-full max-w-lg bg-white p-6 shadow-lg rounded-lg">
          <h1 className="text-3xl font-bold text-blue-500 text-center mb-5">
            AI powered Content Creator
          </h1>
          <FormProvider {...formMethods}>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your prompt, slug, or title"
                required
                className="w-full h-15 p-4 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              ></textarea>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 disabled:opacity-50"
              >
                {loading ? "Generating..." : "Generate Content"}
              </button>
            </form>
          </FormProvider>
        </div>
      </main>
  );
}
