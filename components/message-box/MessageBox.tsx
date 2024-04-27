import React from 'react';
import { getUser } from '@/lib/getCurrentUser';
import { getMessages } from '@/lib/getMessages';
import MessageDisplay from './MessageDisplay';
import MessageInput from './MessageInput';

export default async function MessageBox() {
  const messages = await getMessages();
  const user = await getUser();

  return (
    <div className="flex w-full flex-col shadow-xl">
      <h1 className="bg-slate-500 p-6 text-lg text-white">Messages</h1>
      <div className="grid border-x border-b border-gray-300">
        <div className="grid h-64 gap-4 overflow-auto p-4">
          {messages.length === 0 && <div className="grid place-content-center text-gray-500">No messages</div>}
          {messages.map(message => {
            return <MessageDisplay userId={user.id} key={message.id} message={message} />;
          })}
        </div>
        <MessageInput />
      </div>
    </div>
  );
}
