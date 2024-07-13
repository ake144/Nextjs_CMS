
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/db';
import { authenticateApiToken } from '@/utils/authApi';


export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ message: 'Post ID is required' }, { status: 400 });
  }

  try {
    const user = await authenticateApiToken(req);

    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const post = await prisma.post.findMany({
      where: {  author_id: user.id },
    });

    if (!post) {
      return NextResponse.json({ message: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
