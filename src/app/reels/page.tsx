"use client"

import React, { useEffect, useState } from 'react';
import ReelsContainer from "@/components/reels";
import {Input, Navbar, NavbarContent, NavbarItem} from "@nextui-org/react";
import {motion} from "framer-motion";
import {GetIcon} from "@/components/GetIcon";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { ReelsProvider } from  "@/context/ReelsContext"

const Reels = () => {
    const router = useRouter();

    const [n, setN] = useState<string>("comming soon");

    useEffect(() => {
        const states = [
            "coming soon", 
            "coming soon.", 
            "coming soon..", 
            "coming soon..."
        ];
        let index = 0;
        let f = true;
        const intervalId = setInterval(() => {
            setN(states[index]);
            
            if (f) {
                index++;
                if (index === 3) {
                    f = false;
                }
            } else {
                index--;
                if (index === 0) {
                    f = true;
                }
            }
        }, 1000);

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, [])

    return (
        <div className="relative overflow-y-scroll snap-y snap-mandatory h-screen">
            
            <Navbar>
                <NavbarContent justify="start">
                    <NavbarItem>
                        <motion.div
                            initial={{opacity: 0, transform: "translateX(-20px)"}}
                            animate={{opacity: 1, transform: "translateX(0px)"}}
                            transition={{duration: 0.5, delay: 0.5}}
                            onClick={() => router.back()}
                            className={'flex w-full gap-x-2 text-default-500'}
                        >
                            <GetIcon name={'move-left'}/>
                            <span>back</span>
                        </motion.div>
                    </NavbarItem>
                </NavbarContent>
                <NavbarContent justify="end">
                    <NavbarItem>
                        <motion.div
                            initial={{opacity: 0, transform: "translateX(20px)"}}
                            animate={{opacity: 1, transform: "translateX(0px)"}}
                            transition={{duration: 0.5, delay: 0.5}}
                            className={'flex w-full gap-x-2 text-default-500'}
                        >
                            <Link
                                // api his this -> /upload/reel
                                href={''}
                                className={'w-[35px] h-[35px] rounded-full bg-default-200/50 flex items-center justify-center hover:bg-default-200 hover:shadow-xl'}
                                
                            >
                                <GetIcon name={'plus'} className={'!w-6 text-white'}/>
                            </Link>
                        </motion.div>
                    </NavbarItem>
                </NavbarContent>
            </Navbar>
            <div className={'h-screen w-screen flex items-center justify-center'}>{n}</div>
            {/* <ReelsProvider>
                <ReelsContainer />
            </ReelsProvider> */}
        </div>
    );
};

export default Reels;
