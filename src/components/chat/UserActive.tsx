"use client"

import React from 'react';
import UserCard from '@/components/chat/UserCard';
import { postData } from '@/app/teptData';
import { useQuery } from '@tanstack/react-query'
import axios from 'axios';
import { Spinner } from '@nextui-org/react';

interface UserActiveProps {
    _id: string; 
    name: string; 
    profileImage: { profileImageURL: string | undefined }; 
    role: string; 
    active: boolean;
}

const UserActive = () => {

    const fetchUsers = async () => {
        const token = localStorage.getItem('app-token');

        const res = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/friend/get-all?env=friends&isAll=true`,
            {
                headers: {token: token}
            }
        )
        console.log(res.data.friends);
        const sortedFriends = res.data.friends.sort((a: any, b: any) => b.active - a.active);

        return sortedFriends;
    }

    const { data, isPending } = useQuery({
        queryKey: ["active-users"],
        queryFn: fetchUsers
    });

    return (
        <div className={'w-auto flex h-auto overflow-x-auto gap-x-4 scrollbar-hide'}>
            {
                isPending ? <Spinner size={"md"} color="primary" /> : (
                    data?.map((item: UserActiveProps) => (
                        <UserCard
                            key={item._id}
                            _id={item._id}
                            name={item.name}
                            imgSrc={item.profileImage?.profileImageURL || "images/default-forground.png"}
                            active={item.active}
                        />
                    ))
                )
            }
        </div>
    );
};

export default UserActive;
