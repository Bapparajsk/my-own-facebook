"use client"

import React from 'react';
import UserCard from '@/components/chat/UserCard';
import { postData } from '@/app/teptData';
import { useQuery } from '@tanstack/react-query'
import axios from 'axios';
import { Spinner } from '@nextui-org/react';

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
        
        return res.data.friends;
    }

    const { data, status, isError, isPending } = useQuery({
        queryKey: ["active-users"],
        queryFn: fetchUsers
    });

    if(isPending) return <Spinner size={"md"} color="primary" />

    return (
        <div className={'w-auto flex h-auto overflow-x-auto gap-x-4 scrollbar-hide'}>
            {
                data?.map((item: { _id: string; name: string; profileImage: { profileImageURL: any; }; role: string; active: boolean; }, idx: React.Key | null | undefined) => (
                    <UserCard
                        key={idx}
                        name={item.name}
                        imgSrc={item.profileImage?.profileImageURL || "images/default-forground.png"}
                        active={item.active}
                    />
                ))
            }
        </div>
    );
};

export default UserActive;
