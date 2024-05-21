import React, { useEffect, useState } from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, User } from "@nextui-org/react";
import { SearchIcon } from "@nextui-org/shared-icons";
import useScreenSize from "@/hooks/useScreenSize";
import Link from "next/link";
import { GetIcon } from "@/components/GetIcon";
import { motion } from "framer-motion";

const initial = {
    transform: "translateY(-80px)"
}

const MotionLink = motion(Link);

export default function TopLogo(): React.JSX.Element | null {
    const size = useScreenSize();


    if (size && size > 640) {
        return null;
    }

    return (
        <motion.div
            initial={{opacity: 0, transform: "translateY(-80px)"}}
            animate={{opacity: 1, transform: "translateY(0px)"}}
            transition={{ duration: 0.5 }}
        >
            <Navbar shouldHideOnScroll>
                <NavbarBrand>
                    <MotionLink
                        initial={{opacity: 0, transform: "translateX(-80px)"}}
                        animate={{opacity: 1, transform: "translateX(0px)"}}
                        transition={{ duration: 0.5, delay: 0.5}}
                        href={'profile'}
                        className={'flex'}
                    >
                        <User
                            name={'Bapparaj sk'}
                            description={'full Stack Developer'}

                            avatarProps={{
                                fallback: true,
                                src: "https://pbs.twimg.com/profile_images/1754927710302883841/ylGsCbNa_400x400.jpg"
                            }}
                        />
                    </MotionLink>
                </NavbarBrand>
                <NavbarContent justify="end">
                    <NavbarItem>
                        <Link href={'/search'}>
                            <SearchIcon className="text-2xl cursor-pointer text-default-500 pointer-events-none" />
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link href={'/setting'}>
                            <GetIcon name={'manu'} size={30} className={'text-default-500'}/>
                        </Link>
                    </NavbarItem>
                </NavbarContent>
            </Navbar>
        </motion.div>
    );
}
