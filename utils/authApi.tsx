import prisma from '@/utils/db';
import { NextRequest } from 'next/server';

export async function authenticateApiToken(req: NextRequest) {
  const token = req.headers.get('authorization');

  if (!token) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { apiToken: token },
  });

  return user;
}
