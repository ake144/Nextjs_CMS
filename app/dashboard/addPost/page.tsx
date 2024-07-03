'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useState, useCallback } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Tiptap from "@/components/Texteditor";
import { CreatePost } from "@/utils/actions/blog/creatPost";
import GeneratePost from "@/components/generatePost";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";


const formSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters." }),
  slug: z.string().min(5, { message: "Slug must be at least 5 characters." }),
  featureImage: z.string(),
  description: z.string().min(10, { message: "Content must be at least 10 characters." }).trim(),
});

const AddPost = () => {
  const [useAI, setUseAI] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [aiGeneratedContent, setAiGeneratedContent] = useState("");

  const formMethods = useForm({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      slug: "",
      featureImage: "",
      description: "",
    },
  });

  const handleImageUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
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
  }, [formMethods]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { title, slug, featureImage, description } = values;

      const response = await CreatePost({
        title,
        slug,
        featureImage,
        content: description,
        authorId: '1' , // Replace with actual author ID
      });

      if ('error' in response) {
        console.error("Failed to create post:", response.error);
      } else {
        console.log("Post created successfully:", response);
        // Optionally, handle success feedback or redirection
      }
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-gray-100 min-h-screen">
      <div className="w-full max-w-2xl bg-white p-6 shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-blue-500 text-center mb-5">Create a New Post</h1>
        <div className="flex justify-center mb-5">
          <Button onClick={() => setUseAI(false)} className={!useAI ? "bg-blue-600 text-white" : ""}>
            Create Manually
          </Button>
          <Button onClick={() => setUseAI(true)} className={useAI ? "bg-blue-600 text-white" : ""}>
            Generate with AI
          </Button>
        </div>
        {useAI ? (
          <GeneratePost setAiGeneratedContent={setAiGeneratedContent} />
        ) : (
          <FormProvider {...formMethods}>
            <Form {...formMethods}>
              <form onSubmit={formMethods.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={formMethods.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug</FormLabel>
                      <FormControl>
                        <Input placeholder="Slug for your Blog" {...field} />
                      </FormControl> 
                    </FormItem>
                  )}
                />
                <FormField
                  control={formMethods.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Main title for your Blog" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={formMethods.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="bg-black">
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Tiptap content={field.value} onChange={field.onChange} />
                      </FormControl>
                      {/*'' */}
                    </FormItem>
                  )}
                />
                <FormField
                  control={formMethods.control}
                  name="featureImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Feature Image</FormLabel>
                      <FormControl>
                        <>
                          <input type="file" accept="image/*" onChange={handleImageUpload} />
                          {imagePreview && (
                            <Image
                              src={imagePreview}
                              alt="Preview"
                              className="mt-2 w-32 h-32 object-cover border rounded"
                            />
                          )}
                        </>
                      </FormControl>
                 
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 disabled:opacity-50">
                  Submit
                </Button>
              </form>
            </Form>
          </FormProvider>
        )}
        {aiGeneratedContent && (
          <div className="mt-6 bg-gray-50 p-4 my-5 rounded-md">
            <h2 className="text-xl font-semibold mb-2 text-black">Generated Content</h2>
            <ScrollArea className="h-[400px] mb-2 rounded-md border p-4">
              <div className="text-gray-700 whitespace-pre-wrap">
                {aiGeneratedContent}
              </div>
            </ScrollArea>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddPost;
