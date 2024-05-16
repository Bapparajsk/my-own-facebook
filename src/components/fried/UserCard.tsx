"use client"

import React from 'react';
import {Avatar, Button} from "@nextui-org/react";

interface UserCardProps {
    userImg: string
    name: string
    isFriendRequest: boolean
}

const UserCard = ({userImg, name, isFriendRequest} : UserCardProps) => {
    return (
        <div className={'w-full h-auto flex items-center justify-start gap-x-2'}>
            <div className={'w-auto flex items-center justify-center'}>
                <Avatar src={userImg} className="!w-20 !h-20 text-large" />
            </div>
            <div className={'w-full h-full flex flex-col items-start justify-center gap-y-2'}>
                <p>{name}</p>
                <div className={'w-full h-auto flex items-center justify-center gap-x-3'}>
                    <Button color="primary" variant="shadow" className={'grow'}>
                        { isFriendRequest ? "Confirm" : "Add Friend"}
                    </Button>
                    <Button color="primary" variant="flat" className={'grow'}>
                        Ignore
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default UserCard;
