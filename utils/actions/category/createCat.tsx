'use server'

import prisma from "@/utils/db";

export async function createCategory({ category }: { category: string }) {
  console.log('the category', category);
  try {
    const newCat = await prisma.category.create({
      data: { category }
    });
    return newCat;
  } catch (error) {
    console.error("Error creating post:", error);
    return { error: "category creation failed" };
  }
}
