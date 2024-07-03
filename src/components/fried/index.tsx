import React from 'react';
import Link from "next/link";
import FriendRequest from "@/components/fried/FriendRequest";
import FriendRequestSend from "@/components/fried/FriendRequestSend";

const ShowAllFriends = () => {
    return (
        <div className={'w-full h-auto flex flex-col gap-y-3 mt-6 mb-3'}>
            <div className={'w-full h-auto flex flex-col gap-y-3'}>
                <div className={'flex items-center justify-between'}>
                    <h2>Friend requests</h2>
                    <Link
                        href={'/friend/requests'}
                        className={'text-blue-500'}
                    >
                        See all
                    </Link>
                </div>
                <FriendRequest seeAllFriends={true} fetchdata={"request"}/>
            </div>
            <hr className="border-none h-[1px] bg-default-300 text-red-800"/>
            <div className={'w-full h-auto flex flex-col gap-y-3'}>
                <div className={'flex items-center justify-between'}>
                    <h2>People you may know</h2>
                </div>
                <FriendRequestSend/>
            </div>
        </div>
    );
};

export default ShowAllFriends;
