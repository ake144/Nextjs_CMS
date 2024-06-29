import prisma from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

interface Post {
  slug?: string;
  title: string;
  content: string;
  featureImage: string;
  authorId: string;
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { slug, title, content, featureImage, authorId }: Post = body;

  if (!title || !content || !featureImage || !authorId) {
    return NextResponse.json({ error: "Title, content, feature image, and author ID are required" }, { status: 400 });
  }

  try {
    const newPost = await prisma.post.create({
      data: {
        slug,
        title,
        content,
        image: featureImage,
        author_id: authorId,
      },
    });
    return NextResponse.json(newPost, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: "Post creation failed" }, { status: 400 });
  }
}
