import React from 'react';
import Nav from '@/components/chat/Nav'
import ChatContainer from '@/components/chat';

const Message = () => {
    return (
        <div className={'w-full h-auto'}>
            <Nav/>
            <div className={'w-full h-auto my-12 px-4'}><ChatContainer/></div>
        </div>
    );
};

export default Message;
