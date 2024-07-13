// pages/api/posts.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { getPostsByApiKey } from '@/utils/actions/blog/getPosts';
import { NextResponse } from 'next/server';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const apiKey = req.headers['x-api-key'] as string;

  if (!apiKey) {
    return res.status(400).json({ error: 'API key is required' });
  }

  try {
    const posts = await getPostsByApiKey(apiKey);
    return NextResponse.json({data:posts}, {status:200});
  } catch (error: any) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: error.message }, {status:500});
  }
}
