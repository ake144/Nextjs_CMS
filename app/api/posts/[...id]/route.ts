import { getOnePostByApi } from "@/utils/actions/blog/getPosts";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req:NextRequest){
    
  const apiKey = req.headers.get('x-api-key') as string;
  const id = req.url.split('/').pop();
  if(!id){
    return NextResponse.json({error:'ID IS REQUIRED'}, {status:400})
  }


  if(!apiKey){
    return NextResponse.json({error:'API KEY IS REQUIRED'}, {status:400})
  }
  

  try{

    const post = await getOnePostByApi(apiKey, id);
    if(!post){
      return NextResponse.json({error:'POST NOT FOUND'}, {status:404})
    }

return NextResponse.json(post, {status:200})

  }
  catch (error:any){
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: error.message }, {status:500});

  }

  

}