"use client"

import React from 'react';
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Input} from "@nextui-org/react";
import { SearchIcon } from 'lucide-react';
import { GetIcon } from '@/components/GetIcon';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const Nav = () => {
    const router = useRouter();
    return (
        <Navbar position="static">
            <NavbarContent className={'w-full flex h-auto mt-14 flex-col items-start z-50'} justify="start">
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
                <NavbarItem>
                    <Input
                        type="text"
                        variant={'underlined'}
                        placeholder="Search"
                        color={'success'}
                        startContent={
                            <SearchIcon size={19} className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
                        }
                    />
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
};

export default Nav;
