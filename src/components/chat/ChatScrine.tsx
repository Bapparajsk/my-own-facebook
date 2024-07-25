"use client"

import React, { useEffect } from 'react';
import {Input, Button} from "@nextui-org/react";
import { GetIcon } from '../GetIcon';
import SendMe from './SendMe';
import SendYou from './SendYou';

const ChatScrine = ({chat, id}: {chat: any, id: string}) => {

    const messagesEndRef = React.useRef<HTMLButtonElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
    };

    useEffect(() => {
        scrollToBottom();
    }, []);

    return (
        <div className={'w-full h-full'}>
            <div className={'w-screen z-50 fixed bottom-0 bg-black/20 py-2 flex gap-x-2 px-2 backdrop-blur-xl'}>
                <Input
                    type="text"
                    placeholder="Type your message"
                    onClear={() => console.log("input cleared")}
                    className="w-full"
                />
                <Button color="primary" variant="shadow" isIconOnly >
                    <GetIcon name={'send'} className={'!w-6 !h-6'}/>
                </Button>
            </div>
            <div className={'w-full flex flex-col gap-y-2 px-4 pb-16'}>
                {
                    chat?.map((message: any, index: number) => (
                        message.sender === id ? (
                            <SendYou key={index} message={message.message}/>
                        ) : (
                            <SendMe key={index} message={message.message}/>
                        )
                    ))
                }
                {/* <SendMe message={'hello'}/>
                <SendMe message={'Tar pore proseed to jrm bole akta upore nil moto lekha thakbe ota te ok korbe'}/>
                <SendYou message={'Tar pore proseed to jrm bole akta upore nil moto lekha thakbe ota te ok korbe'}/> */}
            </div>
        </div>
    );
};

export default ChatScrine;
