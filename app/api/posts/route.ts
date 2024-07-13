import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/db';
import { authenticateApiToken } from '@/middleware/authenticateApiToken';

export async function GET(req: NextRequest) {
  try {
    const user = await authenticateApiToken(req);

    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const posts = await prisma.post.findMany({
      where: { userId: user.id },
    });

    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
