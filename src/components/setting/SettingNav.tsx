"use client"

import React from 'react';
import {Navbar, NavbarContent, NavbarItem} from "@nextui-org/react";
import Link from "next/link";
import {GetIcon} from "@/components/GetIcon";
import {SearchIcon} from "@nextui-org/shared-icons";
import {useRouter} from "next/navigation";
import {motion} from "framer-motion";

const SettingNav = () => {

    const router = useRouter();

    return (
        <Navbar shouldHideOnScroll>
            <NavbarContent justify="start">
                <NavbarItem>
                    <motion.div
                        initial={{opacity: 0, transform: "translateX(-20px)"}}
                        animate={{opacity: 1, transform: "translateX(0px)"}}
                        transition={{ duration: 0.5 }}
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
                    <Link href={'/search'}>
                        <SearchIcon className="text-2xl cursor-pointer text-default-500 pointer-events-none"/>
                    </Link>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
};

export default SettingNav;
