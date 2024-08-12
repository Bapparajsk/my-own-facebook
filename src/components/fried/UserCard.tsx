"use client"

import React, { ReactNode, use, useEffect, useState } from 'react';
import {Avatar, Button} from "@nextui-org/react";
import { useFriendsContext } from '@/context/FriendsContext';
import { useMutation } from '@tanstack/react-query';
import { AnimatedCheckIcon } from '../AnimatedCheckIcon';

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

    const [isLoding, setIsLoding] = useState<ReactNode>();

    const friendrequest = useMutation({
        mutationFn: async ({tag, _id}: {tag: string, _id: string}) => {
            if (tag === "send-request") {
                return sendFriendrequest(_id);
            } 
            return acceptFriendRequest(_id);
        },
    });

    const RejectFriendRequest = useMutation({
        mutationFn: async (id: string) => {
            return rejectFriendRequest(id);
        },
    });

    useEffect(() => {
        if (RejectFriendRequest.isSuccess) {
            setIsLoding(<AnimatedCheckIcon/>);

            setTimeout(() => {
                setIsLoding("Rejectd");
            }, 1000);
        }


    }, [RejectFriendRequest.isSuccess]); 
    
    return (
        <div className={'w-full h-auto flex items-center justify-start gap-x-2'}>
            <div className={'w-auto flex items-center justify-center'}>
                <Avatar src={userImg} className="!w-20 !h-20 text-large" />
            </div>
            <div className={'w-full h-full flex flex-col items-start justify-center gap-y-1'}>
                <p>{name}</p>
                <p>{role}</p>
                <div className={'w-full h-auto flex items-center justify-center gap-x-3'}>
                    {!isMyFriend && <Button 
                        color="primary" 
                        isLoading={friendrequest.isPending} 
                        isDisabled={friendrequest.isSuccess} 
                        variant="shadow" 
                        className={'grow'} 
                        onClick={() => isFriendRequest ? friendrequest.mutate({tag: "accept", _id: id}) : friendrequest.mutate({tag: "send-request", _id: id})}
                    >
                        { friendrequest.isSuccess ? <AnimatedCheckIcon/> : isFriendRequest ? "Confirm" : "Add Friend" } 

                    </Button>}
                    {!isMyFriend && !sendFriendRequest && 
                        <Button 
                            onClick={() => RejectFriendRequest.mutate(id)} 
                            color="primary" 
                            variant="flat" 
                            className={'grow'}
                            isLoading={RejectFriendRequest.isPending}
                            isDisabled={RejectFriendRequest.isSuccess || friendrequest.isSuccess }
                        >
                            {RejectFriendRequest.isSuccess ? isLoding : "Ignore"}
                        
                        </Button>
                    }
                </div>
            </div>
        </div>
    );
};

export default UserCard;
