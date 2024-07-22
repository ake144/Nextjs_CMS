'use server'

import prisma from "@/utils/db";


export async function totalPosts() {
  try {
    const posts = await prisma.post.count();
    return posts;
  } catch (error) {
    console.error("Error getting posts:", error);
    return { error: "post retrieval failed" };
  }
}


export async function totalCategories() {
  try {
    const categories = await prisma.category.count();
    return categories;
  } catch (error) {
    console.error("Error getting categories:", error);
    return { error: "category retrieval failed" };
  }
}

export async function totalUsers() {
    try {
        const users = await prisma.user.count();
        return users;
    } catch (error) {
        console.error("Error getting users:", error);
        return { error: "user retrieval failed" };
    }
    }