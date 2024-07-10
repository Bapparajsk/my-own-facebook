import React from 'react';
import {Avatar, Badge} from "@nextui-org/react";

interface UserCardProps {
    imgSrc: string
    name: string
    active: boolean
}

const UserCard = ({imgSrc, name, active} : UserCardProps) => {
    return (
        <div>
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
