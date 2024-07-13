import { v4 as uuidv4 } from 'uuid';
import prisma from './db';

async function generateApiKeyForUser(userId) {
  const apiKey = uuidv4();
  await prisma.user.update({
    where: { id: userId },
    data: { apiKey },
  });
  return apiKey;
}
