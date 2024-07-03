"use client"

import {Button, Spinner} from "@nextui-org/react";
import ShowAllFriends from "@/components/fried";
import Link from "next/link";
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/context/UserProvider";
import { useEffect } from "react";
import { useFriendsContext } from "@/context/FriendsContext";


export default function Friend() {


    const router = useRouter();
    const { userDetails, fetchUser } = useUserContext();
    const { removeList } = useFriendsContext();
    const queryClient = useQueryClient();

    
    const {isPending, isError, data, isSuccess} = useQuery({
        queryKey: ["get-user"],
        queryFn: fetchUser,
        retry: 1,
        enabled: userDetails === undefined
    });

    useEffect(() => {
        return () => {
            removeList("send");
            removeList("friend");
            removeList("request");
        }
    },[])

    if (isPending) {
        console.log("data is loading please wiet");
        return (
            <div className={'w-screen h-screen absolute flex items-center justify-center'}>
                <Spinner color="success" size={'lg'}/>
            </div>
        );
    }

    if(isError) {
        console.log("error from home");
        router.push('/sign-in');
    }
    
    return (
        <div className={'w-full h-auto px-4'}>
            <div className={'w-full h-auto flex items-center justify-start gap-x-2 mt-2'}>
                <Button as={Link} href={'/friend/suggestions'} radius="full">
                    Suggestions
                </Button>
                <Button as={Link} href={'/friend/friends'} radius="full">
                    Your friends
                </Button>
            </div>
            {
                userDetails ? (<ShowAllFriends/>) : (
                    <div className={'w-full h-screen flex items-center justify-center'}>
                        <Spinner color="success" size={'lg'}/>
                    </div>
                )
            }
        </div>
    );
}
