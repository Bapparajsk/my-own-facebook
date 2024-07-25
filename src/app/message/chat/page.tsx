"use client"

import React, { useState } from 'react';
import {useSearchParams, useRouter } from 'next/navigation'
import {Navbar, NavbarContent, Badge, Avatar, User} from "@nextui-org/react";
import Link from 'next/link'
import { motion } from 'framer-motion';
import { GetIcon } from '@/components/GetIcon';
import ChatScrine from '@/components/chat/ChatScrine';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface ChatUser {
    _id: string;
    name: string;
    profileImage: { profileImageURL: string | undefined };
    role: string;
    active: boolean;
}

const Page = () => {

    const router = useRouter();

    const params = useSearchParams();

    const id = params.get('id');
    if (!id) {
        router.push('/message');
        console.log('no id');
        return;
    }

    const { status , data } = useQuery({
        queryKey: ['chat'],
        queryFn: async () => {
            const token = localStorage.getItem('app-token');
            if (!token) {
                router.push('/sign-in');
            }

            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/api/chat/get_chat?uid=${id}`,
                {
                    headers: {token: token}
                }
            )

            console.log(res.data);
            return res.data.chat;
        },
        retry: 2
    });
    
    return (
        <div className={'w-full min-h-screen'}>
            <Navbar shouldHideOnScroll>
                <NavbarContent justify="start">
                    <motion.div
                        initial={{opacity: 0, transform: "translateX(-20px)"}}
                        animate={{opacity: 1, transform: "translateX(0px)"}}
                        transition={{duration: 0.5}}
                        onClick={() => router.back()}
                        className={'flex w-auto gap-x-2 text-default-500'}
                    >
                        <GetIcon name={'move-left'}/>
                        <span>back</span>
                    </motion.div>
                </NavbarContent>
                <NavbarContent justify="end">
                    <motion.div
                        initial={{opacity: 0, transform: "translateX(-20px)"}}
                        animate={{opacity: 1, transform: "translateX(0px)"}}
                        transition={{duration: 0.5}}
                        onClick={() => router.back()}
                        className={'flex w-auto gap-x-2 text-default-500'}
                    >
                        <Badge disableAnimation={false} content={data?.chatUser?.active} color="success" shape="circle" placement="bottom-right">
                            <Avatar
                                radius="full"
                                src={data?.chatUser?.profileImage?.profileImageURL || "/images/default-forground.png"}
                            />
                        </Badge>
                    </motion.div>
                </NavbarContent>
            </Navbar>
            <div className={'w-full h-full'}>
                { status === "error" && <p>error</p> }
                { status === "pending" && <p>Loading...</p> }
                { status === "success" && <ChatScrine chat={data?.chat} id={id}/>}
            </div>
        </div>
    );
};

export default Page;
