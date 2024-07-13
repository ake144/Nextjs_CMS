'use sever'

import prisma from "@/utils/db";

interface CreateCategoryArgs {
  category: string;
}

export async function createCategory({ category }: CreateCategoryArgs) {
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
