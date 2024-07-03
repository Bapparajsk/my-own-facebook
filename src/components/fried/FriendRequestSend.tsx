import React, { useEffect } from 'react';
import {friendData} from "@/app/teptData";
import UserCard from "@/components/fried/UserCard";
import { useQuery } from '@tanstack/react-query';
import { useFriendsContext } from '@/context/FriendsContext';
import axios from 'axios';

const FriendRequestSend = () => {

    const { sendFriendRequest , getallFriendlist, removeList } = useFriendsContext();
    
    const {isPending, isError, isSuccess, data } = useQuery({
        queryKey: ['get-friend-send-request'],
        queryFn: async () => await getallFriendlist({envType: "send-request",page: 1, limit: 10}),
        enabled: sendFriendRequest.length === 0
    });    


    if (isPending) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <div>Error</div>
    }
    
    return (
        <div className={'w-auto h-auto flex flex-col gap-y-2'}>
            {
                sendFriendRequest.map((user, idx) => (
                    <UserCard 
                        id={user._id}
                        key={idx} 
                        userImg={user.profileImage?.profileImageURL || "/images/default-forground.png"} 
                        name={user.name} isFriendRequest={false}
                        sendFriendRequest
                    />
                ))
            }
        </div>
    );
};

export default FriendRequestSend;
