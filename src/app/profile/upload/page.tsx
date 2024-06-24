"use client"

import React, {useEffect} from 'react';
import SettingNav from "@/components/setting/SettingNav";
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, Spinner, user} from "@nextui-org/react";
import {useUserContext} from "@/context/UserProvider";
import useScreenSize from "@/hooks/useScreenSize";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {useRouter} from "next/navigation";
import { UploadPage } from '@/components/profile/upload/UploadPage';

const Page = () => {

    const { userDetails, fetchUser} = useUserContext();
    const router = useRouter();
    const size = useScreenSize();
    const queryClient = useQueryClient();

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

    return <UploadPage userDetails={data!}/>
};

export default Page;