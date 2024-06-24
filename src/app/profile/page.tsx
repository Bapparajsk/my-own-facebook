"use client"

import React from 'react';
import { Spinner} from "@nextui-org/react";
import {useRouter} from "next/navigation";
import { useUserContext } from '@/context/UserProvider'
import { useQuery } from "@tanstack/react-query";
import useScreenSize from "@/hooks/useScreenSize";
import { ProfilePage } from '@/components/profile/ProfilePage';
import { UserSType } from '@/interface/usertupe';

const Profile = () => {

    const router = useRouter();
    const { userDetails, fetchUser} = useUserContext();
    const size = useScreenSize();

    const {isPending, isError, data, isSuccess} = useQuery({
        queryKey: ["get-user"],
        queryFn: fetchUser,
        staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
        retry: 2, // Retry failed requests twice
        
    });

    if (isPending) {
        console.log("data is loading please wiet");
        return (
            <div className={'w-screen h-screen absolute flex items-center justify-center'}>
                <Spinner color="success" size={'lg'}/>
            </div>
        );
    }
    
    if (!isSuccess) {
        router.replace('/sign-in');
    }

    return (<ProfilePage userDetails={data!}/>);
};

export default Profile;
