import React from 'react';
import {Badge, Avatar} from "@nextui-org/react";
import Link from 'next/link'

interface ChatCardProps {
    imgSrc: string
    name: string
    lastMessage: string
    isActive: boolean
    id: string
}

const ChatCard = ({imgSrc, name, lastMessage, isActive, id}: ChatCardProps) => {
    return (
        <Link href={`/message/chat?id=${id}`} passHref>
            <div className={'w-full h-auto flex items-center justify-start gap-x-4'}>
                <Badge disableAnimation={false} content={isActive && ""} showOutline={false} color="success" shape="circle" placement="bottom-right">
                    <Avatar
                        size="lg"
                        radius="full"
                        src={imgSrc}
                    />
                </Badge>
                <div className="h-full flex flex-col items-scart justify-center text-sm">
                    <strong>{name}</strong>
                    <p className={'font-light'}>{lastMessage}</p>
                </div>
            </div>
        </Link>
    );
};

export default ChatCard;
