import React from 'react';
import {friendData} from "@/app/teptData";
import UserCard from "@/components/fried/UserCard";

const FriendRequestSend = () => {
    return (
        <div className={'w-auto h-auto flex flex-col gap-y-2'}>
            {
                friendData.map((user, idx) => (
                    <UserCard key={idx} userImg={user.userImg} name={user.name} isFriendRequest={false}/>
                ))
            }
        </div>
    );
};

export default FriendRequestSend;
