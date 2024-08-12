'use client'

import { Avatar, Badge, Spinner } from "@nextui-org/react";
import { GetIcon } from "@/components/GetIcon";
import RenderPosts from "@/components/home/RenderPosts";
import { useRouter } from "next/navigation";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import { useUserContext } from '@/context/UserProvider'

export default function Home() {
    const router = useRouter();
    const { userDetails, fetchUser } = useUserContext();
    const ss = useQueryClient();

    const { status, data } = useQuery({
        queryKey: ["get-user"],
        queryFn: fetchUser,
        retry: 3,
        enabled: !userDetails,
        
    });

    if(status === "error") {
        router.replace('/sign-in');
        ss.invalidateQueries();
        return;
    }

    if (status === "pending") {
        return (
            <div className="w-screen h-screen flex items-center justify-center">
                <Spinner color="success" size="lg" />
            </div>
        );
    }

    return (
        <div className={'w-full h-auto px-4'}>
            {status === "success" && <>
                <div className={'w-full h-auto flex gap-x-8 items-center mt-2'}>
                    <Badge
                        color="primary"
                        size="md"
                        placement={'bottom-right'}
                        showOutline={false}
                        content={<GetIcon name={'plus'}/>}
                        disableAnimation={false}
                    >
                        <Avatar
                            size={'lg'}
                            isBordered={false}
                            color={'success'}
                            src={userDetails?.profileImage.profileImageURL || "/images/default-forground.png"}
                        />
                </Badge>
                </div>
                <hr className="border-none h-[1px] bg-default-300 text-red-800 mt-4"/>
                <RenderPosts />
            </>}
        </div>
    );
}
