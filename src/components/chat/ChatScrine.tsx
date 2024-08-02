"use client"

import React, { use, useEffect, useState } from 'react';
import {Input, Button, Textarea} from "@nextui-org/react";
import { GetIcon } from '../GetIcon';
import SendMe from './SendMe';
import SendYou from './SendYou';
import { getSocket } from "@/utils/socket";
import { Socket } from 'socket.io-client';
import { useChatContext } from '@/context/ChatContext';
import { TagUser } from '@nextui-org/shared-icons';
import { RemoveFormatting } from 'lucide-react';
import { useUserContext } from "@/context/UserProvider";


const ChatScrine = ({id, myid}: {id: string, myid: string | null}) => {

    if (myid === null) {
        console.log('no id');
        return <p>No id</p>
    }

    const { chat, setChat } = useChatContext();

    let socket: Socket = getSocket();
    const inputRef = React.useRef<HTMLTextAreaElement>(null);

    const sendMessage = () => {

        if(inputRef.current === null) {
            console.log('no input');
            return;
        }

        const message = inputRef.current.value;
        
        socket.emit('send-message', {
            friendId: id,
            message: message
        });

        setChat([...chat, {
            sender: myid,
            message: message
        }])

        console.log(inputRef.current);
        
        inputRef.current.value = "";

        console.log('message sent');
    };

    const messagesEndRef = React.useRef<HTMLButtonElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
    };

    useEffect(() => {
        scrollToBottom();
        console.log('scroll');
        console.log(chat);
        
    }, [chat]);

    return (
        <div className={'w-full h-full'}>
            <div className={'w-screen z-50 fixed bottom-0 bg-black/20 py-2 flex gap-x-2 px-2 backdrop-blur-xl'}>
                <Textarea
                    ref={inputRef}
                    type="text"
                    placeholder="Type your message..."   
                    minRows={1.5}
                    maxRows={6}
                    fullWidth
                    startContent={
                        <div className={"h-full px-1 flex items-center justify-center"}>
                            <RemoveFormatting />
                        </div>
                    }
                />
                <Button onClick={sendMessage} color="primary" variant="shadow" isIconOnly >
                    <GetIcon name={'send'} className={'!w-6 !h-6'}/>
                </Button>
            </div>
            <div className={'w-full flex flex-col gap-y-2 px-4 pb-16'}>
                {
                    chat?.map((message: any, index: number) => (
                        index === chat.length - 1 ? (
                            message.sender != id ? (
                                console.log('send you'),
                                
                                <SendYou ref={messagesEndRef} key={index} message={message.message}/>
                            ) : (
                                console.log('send me'),
                                <SendMe ref={messagesEndRef} key={index} message={message.message}/>
                            )
                        ) :
                        message.sender != id ? (
                            <SendYou key={index} message={message.message}/>
                        ) : (
                            <SendMe key={index} message={message.message}/>
                        )
                    ))
                }
            </div>
        </div>
    );
};

export default ChatScrine;
