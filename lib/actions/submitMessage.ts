'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/db';
import { slow } from '@/utils/slow';
import { messageSchema } from '@/validations/messageSchema';
import { getMessages } from '../services/getMessages';

type State = {
  success: boolean;
  error?: string;
  content?: string;
};

/**
 *
 * Disclaimer: You wouldn´t want to pass the user id from the client side like this in a real app.
 * It´s simply an example on how to pass additional params.
 * You would want an authentication system and to do everything server-side.
 */
export async function submitMessage(_prevState: State, formData: FormData): Promise<State> {
  await slow();

  const result = messageSchema.safeParse({
    content: formData.get('content'),
    createdById: formData.get('userId'),
  });

  if (!result.success) {
    return {
      error: 'Invalid message!',
      success: false,
    };
  }

  const messages = await getMessages(result.data.createdById);

  if (messages.length > 7) {
    return {
      content: result.data.content,
      error: 'Your message limit has been reached.',
      success: false,
    };
  }

  await prisma.message.create({
    data: result.data,
  });

  revalidatePath('/');

  return {
    success: true,
  };
}
