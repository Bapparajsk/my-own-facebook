"use client"

import React from 'react';
import {Avatar, Button} from "@nextui-org/react";
import { useFriendsContext } from '@/context/FriendsContext';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

interface UserCardProps {
    id: string
    userImg: string
    name: string
    isFriendRequest: boolean
    sendFriendRequest?: boolean
    isMyFriend?: boolean
    role?: string
}

const UserCard = ({id, userImg, name, isFriendRequest, sendFriendRequest, isMyFriend, role} : UserCardProps) => {

    const { sendFriendrequest, acceptFriendRequest, rejectFriendRequest } = useFriendsContext();

    const mutation = useMutation({
        mutationFn: async ({tag, _id}: {tag: string, _id: string}) => {
            if (tag === "send-request") {
                return sendFriendrequest(_id);
            } 
            return acceptFriendRequest(_id);
        },
    });

    console.log("isMyFriend", isMyFriend);
    

    return (
        <div className={'w-full h-auto flex items-center justify-start gap-x-2'}>
            <div className={'w-auto flex items-center justify-center'}>
                <Avatar src={userImg} className="!w-20 !h-20 text-large" />
            </div>
            <div className={'w-full h-full flex flex-col items-start justify-center gap-y-1'}>
                <p>{name}</p>
                <p>{role}</p>
                <div className={'w-full h-auto flex items-center justify-center gap-x-3'}>
                    {!isMyFriend && <Button color="primary" isLoading={mutation.isPending}  variant="shadow" className={'grow'} onClick={() => {
                        if (isFriendRequest) {
                            mutation.mutate({tag: "accept", _id: id});
                        } else {
                            mutation.mutate({tag: "send-request", _id: id});
                        }
                    }}>
                        { isFriendRequest ? "Confirm" : "Add Friend"}
                    </Button>}
                    {!isMyFriend && !sendFriendRequest && <Button onClick={() => rejectFriendRequest(id)} color="primary" variant="flat" className={'grow'}>
                        Ignore
                    </Button>}
                </div>
            </div>
        </div>
    );
};

export default UserCard;
