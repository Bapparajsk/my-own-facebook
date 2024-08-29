"use client"

import React from 'react';
import { useSearchParams, useRouter } from 'next/navigation'
import { EventType } from "@/components/setting/EventType";
import { useUserContext } from "@/context/UserProvider";
import { useQuery } from "@tanstack/react-query";
import { UserSType } from '@/interface/usertupe';
import axios from 'axios';



const Page = () => {

    const searchParams = useSearchParams();
    const router = useRouter();
    const env = searchParams.get('env');
    const { userDetails } = useUserContext();


    if (!userDetails || env === null || !["name", "role", "contact-information", "birthday", "profile-picture"].includes(env)) {
        router.back();
        return null;
    }

    return (
        <div className={'w-full h-screen flex items-center justify-center'}>
            <EventType env={env} user={userDetails}/>
        </div>
    );
};

export default Page;
