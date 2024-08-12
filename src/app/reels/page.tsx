"use client"

import React, { useEffect, useState } from 'react';
import ReelsContainer from "@/components/reels";
import {Button, Input, Navbar, NavbarContent, NavbarItem, Spinner} from "@nextui-org/react";
import {AnimatePresence, motion} from "framer-motion";
import {GetIcon} from "@/components/GetIcon";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { AnimatedCheckIcon } from '@/components/AnimatedCheckIcon';


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

    const [v, setV] = useState<"stop" | "prosess" | "success">("stop");

    useEffect(() => {
        if(v === "prosess") {
            setTimeout(() => {
                setV("success");
            }, 5000);
        }
    }, [v])

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
            {/* <div className={'h-screen w-screen flex items-center justify-center'}>{n}</div> */}
            {/* <ReelsProvider>
                <ReelsContainer />
            </ReelsProvider> */}
            <div className={'w-full h-full flex items-center justify-center px-10'}>
                <Button
                    color={v === "stop" ? "primary" : v === "prosess" ? "warning" : "success"}
                    variant={v === "stop" ? "flat" : v === "prosess" ? "ghost" : "shadow"}
                    onClick={() => setV("prosess")}
                    isLoading={v === "prosess"}
                    disabled={v === "success"}
                    fullWidth
                >
                    {v === "stop" ? "Start" : v === "success" && <AnimatedCheckIcon/> }
                </Button>
            </div>
        </div>
    );
};



export default Reels;
