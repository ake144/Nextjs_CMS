'use server'

// utils/actions/blog/createPost.ts

import prisma from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

interface Post {
  slug?: string;
  title: string;
  content: string;
  featureImage: string;
  authorId: string;
}

export async function CreatePost(data: Post) {
  try {
    const { title, slug, content, featureImage, authorId }: Post = data;

    if (!title || !content || !featureImage || !authorId) {
      return NextResponse.json(
        { error: "Title, content, feature image, and author ID are required" },
        { status: 400 }
      );
    }

    const newPost = await prisma.post.create({
      data: {
        slug,
        title,
        content,
        image: featureImage,
        author_id: authorId,
      },
    });

    return newPost; // Return plain object here, not NextResponse.json()
  } catch (error) {
    console.error("Error creating post:", error);
    return { error: "Post creation failed" }; // Return plain object here, not NextResponse.json()
  }
}
