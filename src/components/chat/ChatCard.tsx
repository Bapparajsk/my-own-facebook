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
                <div className="w-full h-full flex justify-between text-sm">
                    <div>
                        <strong>{name}</strong>
                        <p className={'font-light'}>{lastMessage}</p>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ChatCard;
