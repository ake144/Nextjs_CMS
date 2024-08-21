'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Tiptap from "@/components/Texteditor";
import GeneratePost from "@/components/generatePost";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { getByClerkId } from "@/utils/actions/user/user"; // Correct import path

import ImageGen from "@/components/imageGen";
import { ContentTemplate } from "@/utils/types/type";
import TemplateSelector from "@/components/selectTemplate";
import { CreatePost } from "@/utils/actions/blog/creatPost";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useRouter } from "next/navigation";


import ReactMarkdown from 'react-markdown'
import { remark } from 'remark';
import html from 'remark-html';
import { htmlToText } from 'html-to-text';


const formSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters." }),
  slug: z.string().min(5, { message: "Slug must be at least 5 characters." }),
  image: z.string().optional(),
  description: z.string().min(10, { message: "Content must be at least 10 characters." }).trim(),
});

const AddPost = () => {
  const { toast } = useToast();
  const [useAI, setUseAI] = useState(false);
  const [useImg, setUseImg] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [aiGeneratedContent, setAiGeneratedContent] = useState("");
  const { user } = useUser();
  const [userId, setUserId] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<ContentTemplate | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      const fetchUserId = async () => {
        const fetchedUser = await getByClerkId(user.id);
        setUserId(fetchedUser?.id ?? null);
      };
      fetchUserId();
    }
  }, [user]);

  const handleTemplateSelect = (template: ContentTemplate) => {
    setSelectedTemplate(template);
    formMethods.reset({
      slug: "",
      title: "",
      image: "",
      description: "",
    });
  };

  const formMethods = useForm({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      slug: "",
      image: "",
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
          formMethods.setValue("image", reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  }, [formMethods]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!userId) {
      console.error("User ID not found");
      return;
    }
  
    try {
      const { slug, title, image, description } = values;
      
      // Log values for debugging
      console.log("Form Values:", values);
  
      let finalContent = description || ''; // Default to manually entered content
  
      if (useAI) {
        const response = await fetch('/api/blog', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, slug }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          finalContent = data.message || ''; // Use the generated content
        } else {
          console.error("Failed to generate content:", data.message);
          toast({
            variant: "destructive",
            title: "AI Content Generation Failed",
            description: data.message,
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          });
          return;
        }
      }
  
      // Convert HTML to plain text
      const textContent = htmlToText(finalContent, {
        wordwrap: 130,
      });
  
      // Log the final content for debugging
      console.log("Text Content:", textContent);
  
      // Save the post
      const postResponse = await CreatePost({
        slug,
        title,
        image,
        content: textContent, // Store the converted plain text
        authorId: userId,
      });
  
      if ('error' in postResponse) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem while saving the post.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      } else {
        toast({
          description: "Post created successfully",
        });
        router.push('/dashboard/posts');
        console.log("Post created successfully:", postResponse);
      }
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 min-h-screen">
      <div className="w-full dark:bg-white bg-black p-6 shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-blue-500 text-center mb-5">Create a New Post</h1>
        <div className="flex justify-center mb-5">
          <Button
            onClick={() => {
              setUseAI(false);
              setUseImg(false);
            }}
            className={!useAI && !useImg ? "bg-blue-600 mx-1 text-white" : "mx-1"}
          >
            Create Manually
          </Button>
          <Button
            onClick={() => {
              setUseAI(true);
              setUseImg(false);
            }}
            className={useAI && !useImg ? "bg-blue-600 mx-1 text-white" : "mx-1"}
          >
            Generate with AI
          </Button>
          <Button
            onClick={() => {
              setUseImg(true);
              setUseAI(false);
            }}
            className={useImg && !useAI ? "bg-blue-600 mx-1 text-white" : "mx-1"}
          >
            AI Image
          </Button>
        </div>

        {useAI ? (
          <div>
            <TemplateSelector onSelect={handleTemplateSelect} mode={"light"} />
            <GeneratePost setAiGeneratedContent={setAiGeneratedContent} />
          </div>
        ) : useImg ? (
          <ImageGen />
        ) : (
          <FormProvider {...formMethods}>
            <Form {...formMethods}>
              <form onSubmit={formMethods.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={formMethods.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="dark:text-black text-white">Slug</FormLabel>
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
                      <FormLabel className="dark:text-black text-white">Title</FormLabel>
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
                    <FormItem className="dark:text-black text-white dark:bg-white bg-black dark:border-b-gray-50">
                      <FormLabel className="dark:text-black text-white">Description</FormLabel>
                      <FormControl>
                        <Tiptap content={field.value} onChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={formMethods.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="dark:text-black text-white">Feature Image</FormLabel>
                      <FormControl>
                        <>
                          <input type="file" accept="image/*" onChange={handleImageUpload} />
                          {imagePreview && (
                            <Image
                              src={imagePreview}
                              alt="Preview"
                              width={40}
                              height={36}
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
                <ReactMarkdown children={aiGeneratedContent} />
              </div>
            </ScrollArea>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddPost;
