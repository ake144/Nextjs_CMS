import prisma from '@/utils/db';
import type { WebhookEvent } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        console.log('Webhook received');
        const evt = (await req.json()) as WebhookEvent;
        console.log('Event:', evt);

        const { id: clerkUserId } = evt.data;
        if (!clerkUserId) {
            console.error('No user ID provided');
            return NextResponse.json({ error: 'No user ID provided' }, { status: 400 });
        }

        let user = null;
        switch (evt.type) {
            case 'user.created':
                user = await prisma.user.upsert({
                    where: { clerkUserId },
                    update: { clerkUserId },
                    create: { clerkUserId },
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
    } catch (error:any) {
        console.error('Error processing webhook:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
