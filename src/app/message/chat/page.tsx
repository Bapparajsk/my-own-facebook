"use client"

import React from 'react';
import {useSearchParams, useRouter } from 'next/navigation'
import {Navbar, NavbarContent, Badge, Avatar, User} from "@nextui-org/react";
import Link from 'next/link'
import { motion } from 'framer-motion';
import { GetIcon } from '@/components/GetIcon';
import ChatScrine from '@/components/chat/ChatScrine';

const Page = () => {
    // const qurey = useSearchParams();
    // const username: string | null = qurey.get('id');
    const router = useRouter();

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
                        <Badge content="" color="success" shape="circle" placement="bottom-right">
                            <Avatar
                                radius="full"
                                src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
                            />
                        </Badge>
                    </motion.div>
                </NavbarContent>
            </Navbar>
            <div className={'w-full min-h-screen'}>
                <ChatScrine/>
            </div>

        </div>
    );
};

export default Page;
