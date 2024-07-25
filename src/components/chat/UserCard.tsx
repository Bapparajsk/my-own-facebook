import React from 'react';
import {Avatar, Badge} from "@nextui-org/react";
import { useRouter } from 'next/navigation';

interface UserCardProps {
    imgSrc: string
    name: string
    active: boolean
    _id: string
}

const UserCard = ({imgSrc, name, active, _id} : UserCardProps) => {

    const router = useRouter();

    return (
        <div 
            className={'w-auto h-full flex flex-col justify-center items-center cursor-pointer'} 
            onClick={() => router.push(`/message/chat?id=${_id}`)}
        >
            <Badge 
                content={active && ""} 
                color="success" 
                showOutline={false} 
                shape="circle" 
                placement={"bottom-right"}
            >
                <Avatar src={imgSrc} size="lg" />
            </Badge>
            <p className={'font-light leading-4 text-sm text-center'}>{name}</p>
        </div>
    );
};

export default UserCard;
