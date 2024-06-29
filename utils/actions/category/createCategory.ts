'use server'

import prisma from "@/utils/db"
import { NextRequest, NextResponse } from "next/server"

interface category {
    category:string
}

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { category } = body;
        if(!category) {
            return NextResponse.json({error: "Category is required"}, {status: 400})
        }
        try{
            const newCategory = await prisma.category.create({
                data: {
                    category,
                },
            });
            return NextResponse.json(newCategory, {status: 201})

        }
        catch(e){
            return NextResponse.json({error: "Category already exists"}, {status: 400})
        }

}