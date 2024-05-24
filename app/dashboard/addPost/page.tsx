"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React, { useCallback, useState } from "react";
import Tiptap from "@/components/Texteditor";
import Uploadthing from '@/components/uploadthing'

const formSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  featureImage: z.string().min(20, {
    message: "Image should not be empty.",
  }).optional(),
  Description: z.string().min(10, {
    message: "Content must be at least 10 characters.",
  })
    .max(1000, {
      message: "Content must be at most 1000 characters.",
    })
    .trim(),
});

function onSubmit(values: z.infer<typeof formSchema>) {
  console.log(values);
}

const AddPost = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      featureImage: "",
      Description: "",
    },
  });

  const handleImageUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      console.log(event.target.files)
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (reader.result) {
            // Set the image preview
            setImagePreview(reader.result as string);
            // Update the form value for the image field
            form.setValue("featureImage", reader.result as string);
          }
        };
        reader.readAsDataURL(file);
      }
    },
    [form]
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}

          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <>
                <Input className="text-2xl mx-4" placeholder="Main title for your Blog" {...field} />
                </>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="Description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <>
                  <Tiptap Description={field.value} onChange={field.onChange} />
                </>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
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
            </FormItem>
          )}
        />
       < Uploadthing />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default AddPost;
