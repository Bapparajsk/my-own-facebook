import React from 'react';
import UserCard from "@/components/fried/UserCard";
import {Button} from "@nextui-org/button";
import {friendData} from "@/app/teptData";
import Link from "next/link";
import { useFriendsContext } from '@/context/FriendsContext';
import { useQuery } from '@tanstack/react-query';

interface FriendRequestProps {
    seeAllFriends: boolean
    fetchdata: "send-request" | "friends" | "request"
    isMyFriend?: boolean
}

const FriendRequest = ({seeAllFriends, fetchdata, isMyFriend} : FriendRequestProps) => {
    const { friendRequest , getallFriendlist } = useFriendsContext();

    const {isPending, isError, isSuccess, data } = useQuery({
        queryKey: ['get-friend-request'],
        queryFn: async () => await getallFriendlist({envType: fetchdata ,page: 1, limit: 10}),
        enabled: friendRequest.length === 0
    });    

    if (isPending) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <div>Error</div>
    }
    
    return (
        <div className={'w-auto h-auto flex flex-col gap-y-2'}>
            {data.map((user: { _id: string; role: string; profileImage: { profileImageURL: any; }; name: string; }, idx: React.Key | null | undefined) => (
                <UserCard 
                    id={user._id}
                    key={idx} 
                    userImg={user.profileImage?.profileImageURL || "/images/default-forground.png"} 
                    name={user.name} 
                    isFriendRequest={true}
                    role={user.role}
                    isMyFriend={isMyFriend}
                />
            ))}
            <Button as={Link} href={'/friend/requests'} color="primary" variant="ghost" className={`${!seeAllFriends && 'hidden'}`}>
                {friendRequest.length === 0 ? "not found" :"See all"}
            </Button>
        </div>
    );
};

export default FriendRequest;
