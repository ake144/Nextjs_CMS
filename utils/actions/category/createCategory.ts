'use server'

import prisma from "@/utils/db";
import { NextResponse } from "next/server";

import { Prisma } from "@prisma/client";

export interface CategorySchema { 
  category: string;
}



export async function createCategory(data: CategorySchema) {
  try {
    const { category }: CategorySchema = data;

    const newCategory = await prisma.category.create({
      data: {
        category,
      },
    });

    return newCategory;

  } catch (error) {
    console.error("Error creating category:", error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error("Prisma error:", error.message);
      throw new Error(`Prisma error: ${error.message}`);
    } else {
      throw new Error("Error creating category");
    }
  }
}
