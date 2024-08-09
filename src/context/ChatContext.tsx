"use client"

import React, {createContext, useContext, useState} from 'react';
import { getSocket } from "@/utils/socket";
import { Socket } from 'socket.io-client';
import { usePathname } from "next/navigation";
import { useToasterContext } from "@/context/ToasterContext";
import { Avatar } from '@nextui-org/react';
import axios from 'axios';

interface ChatType {
    sender: string,
    message: string
}

interface ChatContextType {
    chat: ChatType[],
    setChat: (chat: ChatType[]) => void
    getChatlist: () => Promise<any>
}

const ChatContext = createContext<ChatContextType>({
    chat: [],
    setChat: (chat: any) => {},
    getChatlist: async () => {}
});

const getPathname = () => {
    if (typeof window !== 'undefined') {
        return window.location.pathname;
    }
    return '';
}

const getQuery = () => {
    if (typeof window != 'undefined') {
        const query = new URLSearchParams(window.location.search).get('id');
        return query;
    }

    return null;
}
 
const ChatProvider = ({ children }: Readonly<{children: React.ReactNode}>) => {

    const [chat, setChat] = useState<{
        sender: string,
        message: string
    }[]>([]);
    const [chatList, setChatList] = useState([]);

    const socket: Socket = getSocket();
    const { setNotyDetails } = useToasterContext();

    socket.on('receive-message', (data: any) => {
        const pathname = getPathname();
        
        if (!pathname.startsWith("/message")) {
            setNotyDetails({
                startIcon:  <Avatar src={data.senderImage} size="md" />,
                contain: {
                    name: data.senderName,
                    message: data.message.slice(0, 15) + "..."
                },
                type: "success",
                link: "/message/chat/?id=" + data.senderId
            })
            return;
        } else if (data.senderId == getQuery()) {
            setChat([...chat, {
                sender: data.senderId,
                message: data.message
            }]);
            return;
        } else if (data.senderId != getQuery()) {
            setNotyDetails({
                startIcon:  <Avatar src={data.senderImage} size="md" />,
                contain: {
                    name: data.senderName,
                    message: data.message.slice(0, 15) + "..."
                },
                type: "success",
                link: "/message/chat/?id=" + data.senderId
            })
            return;
        } else {

        }
    });

    const getChatlist = async () => {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/chat/get_chat_list`,
            {
                headers: {
                    token: localStorage.getItem('app-token')
                }
            }
        );

        const { chats } = response.data;
        console.log(chats);
        
        return chats;
    }

    return (
        <ChatContext.Provider
            value={{
                chat,
                setChat,
                getChatlist
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};

const useChatContext = () => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error('useFriendsContext must be used within a FriendsProvider');
    }
    return context;
}

export { ChatProvider, useChatContext };