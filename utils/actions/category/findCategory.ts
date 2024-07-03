'use server'

import prisma from "@/utils/db";

export async function getCategories() {
  try {
    const categories = await prisma.category.findMany();
    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw new Error('Error fetching categories');
  }
}
