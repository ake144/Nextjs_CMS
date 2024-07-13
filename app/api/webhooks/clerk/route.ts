import prisma from '@/utils/db';
import type { WebhookEvent } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: Request) {
  try {
    console.log('Webhook received');
    const evt = (await req.json()) as WebhookEvent;
    console.log('Event:', evt);

    const userData = evt.data as any; // Typecast to any to access properties directly
    const { id: clerkUserId, email_addresses, first_name, last_name, image_url } = userData;
    const email = email_addresses?.[0]?.email_address;

    if (!clerkUserId) {
      console.error('No user ID provided');
      return NextResponse.json({ error: 'No user ID provided' }, { status: 400 });
    }

    let user = null;
    switch (evt.type) {
      case 'user.created':
        const apiKey = uuidv4();
        user = await prisma.user.upsert({
          where: { clerkUserId },
          update: { clerkUserId, apiKey, email, first_name, last_name, profile_image_url: image_url },
          create: { clerkUserId, apiKey, email, first_name, last_name, profile_image_url: image_url },
        });
        console.log('User created:', user);
        break;
      case 'user.deleted':
        user = await prisma.user.delete({
          where: { clerkUserId },
        });
        console.log('User deleted:', user);
        break;
      default:
        console.warn('Unhandled event type:', evt.type);
        break;
    }

    return NextResponse.json({ user });
  } catch (error: any) {
    console.error('Error processing webhook:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
