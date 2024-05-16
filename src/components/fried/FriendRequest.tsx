import React from 'react';
import UserCard from "@/components/fried/UserCard";
import {Button} from "@nextui-org/button";
import {friendData} from "@/app/teptData";
import Link from "next/link";

const FriendRequest = ({seeAllFriends} : {seeAllFriends: boolean}) => {
    const displayedFriends = seeAllFriends ? friendData.slice(0, 6) : friendData;
    return (
        <div className={'w-auto h-auto flex flex-col gap-y-2'}>
            {displayedFriends.map((user, idx) => (
                <UserCard key={idx} userImg={user.userImg} name={user.name} isFriendRequest={true}/>
            ))}
            <Button as={Link} href={'/friend/requests'} color="primary" variant="ghost" className={`${!seeAllFriends && 'hidden'}`}>
                See all
            </Button>
        </div>
    );
};

export default FriendRequest;
