import React from 'react';
import UserActive from './UserActive';
import UserChatBox from './UserChatBox';
import { QueryProvider } from '@/app/QueryClientProvider';

const ChatContainer = () => {
    return (
        <div className="w-full h-full">
            <UserActive/>
            <hr className="border-none h-[1px] bg-default-300 text-red-800 my-3"/>
            <UserChatBox/>
        </div>
    );
};

export default ChatContainer;
