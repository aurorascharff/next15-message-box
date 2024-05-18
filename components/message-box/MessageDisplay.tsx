'use client';

import React, { useActionState } from 'react';
import toast from 'react-hot-toast';

import { submitMessage } from '@/lib/actions/submitMessage';
import { cn } from '@/utils/cn';
import Button from '../Button';
import type { MessageState, OptimisticMessage } from './Messages';

type Props = {
  message: OptimisticMessage;
  userId: string;
  addOptimisticMessage: (_message: OptimisticMessage) => void;
};

export default function MessageDisplay({ message, userId, addOptimisticMessage }: Props) {
  const isWrittenByUser = userId === message.createdById;

  const [, submitMessageAction] = useActionState(
    async (_prevState: MessageState, formData: FormData) => {
      formData.set('content', message.content);
      formData.set('userId', userId);
      const result = await submitMessage(formData);
      if (result.error) {
        toast.error(result.error);
      }
      return result;
    },
    {
      success: false,
    },
  );

  const action = async (formData: FormData) => {
    addOptimisticMessage({
      content: message.content,
      createdAt: message.createdAt,
      createdById: userId,
      id: message.id,
    });
    await submitMessageAction(formData);
  };

  return (
    <div
      className={cn(
        'flex h-fit w-4/5 flex-col gap-2 rounded p-4 sm:w-2/3',
        isWrittenByUser ? 'justify-self-end bg-slate-200' : 'justify-self-start border border-gray-300',
      )}
    >
      <span className="text-slate-700">
        <span className="font-bold">{isWrittenByUser ? 'You' : 'Them'}</span>
        {' - '}
        <span className="text-nowrap text-sm italic">
          {message.createdAt.toLocaleString('en-US', {
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            month: 'numeric',
            year: 'numeric',
          })}
        </span>
      </span>
      <div className="flex flex-row gap-1">
        {message.content}
        {message.hasFailed && (
          <form className="ml-1 flex flex-row gap-1 text-red-600" action={action}>
            <Button className="hover:underline" type="submit">
              Failed. Retry?
            </Button>
          </form>
        )}
        {message.isSending && <span className="ml-1 text-gray-400"> Sending ...</span>}
      </div>
    </div>
  );
}
