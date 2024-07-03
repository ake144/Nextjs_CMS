import { Dispatch, SetStateAction, useState, useCallback } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";

interface GeneratePostProps {
  setAiGeneratedContent: Dispatch<SetStateAction<string>>;
}

export default function GeneratePost({ setAiGeneratedContent }: GeneratePostProps) {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const formMethods = useForm({
    defaultValues: {
      title: "",
      featureImage: "",
      description: "",
    },
  });

  const handleImageUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (reader.result) {
            setImagePreview(reader.result as string);
            formMethods.setValue("featureImage", reader.result as string);
          }
        };
        reader.readAsDataURL(file);
      }
    },
    [formMethods]
  );

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
    <ScrollArea className="h-[400px] mb-2 rounded-md border p-4">
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
            {/* <FormField
              control={formMethods.control}
              name="featureImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Feature Image</FormLabel>
                  <FormControl>
                    <>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                      {imagePreview && (
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="ml-4 w-32 h-32 object-cover border rounded"
                        />
                      )}
                    </>
                  </FormControl>
                  <FormMessage />
                </FormItem> */}
              {/* )} */}
            {/* /> */}
          </FormProvider>
        </div>
      </main>
    </ScrollArea>
  );
}
