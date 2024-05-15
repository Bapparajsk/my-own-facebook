"use client"

import React from 'react';
import {Avatar, Badge} from "@nextui-org/react";
import {GetIcon} from "@/components/GetIcon";

interface Props {
    id: string
    imgSrc: string
    totalStatusNumber?: number
}

const StatusAvatar = ({id, imgSrc, totalStatusNumber} : Props) => {

    return (
        <Badge
            className={'bg-pink-500'}
            size="md"
            showOutline={false}
            content={totalStatusNumber && totalStatusNumber}
        >
            <Avatar
                size={'lg'}
                isBordered
                color={'success'}
                src={imgSrc}
            />
        </Badge>
    );
};

export default StatusAvatar;
