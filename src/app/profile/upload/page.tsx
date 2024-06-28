"use client"

import React from 'react';
import {Spinner} from "@nextui-org/react";
import {useUserContext} from "@/context/UserProvider";
import {useQuery} from "@tanstack/react-query";
import {useRouter} from "next/navigation";
import { UploadPage } from '@/components/profile/upload/UploadPage';

const Page = () => {

    const { fetchUser} = useUserContext();
    const router = useRouter();

    const {isPending, data, isSuccess} = useQuery({
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

    return <UploadPage userDetails={data!}/>
};

export default Page;