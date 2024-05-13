"use client"

import React, {useEffect, useRef, useState} from 'react';
import {Badge, Button} from "@nextui-org/react";
import Link from "next/link";
import { GetIcon } from "@/components/GetIcon";
import { usePathname } from "next/navigation"
import { useNavContext } from '@/context/NavContext';
import { motion } from "framer-motion"

interface Data {
    home : boolean,
    friend: boolean,
    reels: boolean,
    massg: boolean,
    notify: boolean
}

const initial = {
    opacity: 0,
    transform: "translateY(80px)"
}

const MobileNavbar = () => {
    const pathName = usePathname();

    const [navButtonPosition, setNavButtonPosition] = useState<number>(40)
    const [navButtonHover, setNavButtonHover] = useState({
        home : true,
        friend: false,
        reels: false,
        massg: false,
        notify: false
    });


    const f = useRef(null);

    const setNavButton = (value : string) => {
        const indexToSet = ['home', 'friend', 'reels', 'message', 'notification'].indexOf(value);
        const data:Data  = {
            home: value === 'home',
            friend: value === 'friend',
            reels: value === 'reels',
            massg: value === 'message',
            notify: value === 'notification'
        }

        // @ts-ignore
        const computedStyle = window.getComputedStyle(f.current);
        const totalWidth = (parseInt(computedStyle.width.slice(0, -2)) - 280) / 4;
        setNavButtonHover(data)
        setNavButtonPosition(40 + (totalWidth * indexToSet) + (40 * indexToSet))
    }

    useEffect(() => {
        const indexToSet = ['/', '/friend', '/reels', '/message', '/notification'].indexOf(pathName);
        const data:Data  = {
            home: pathName === '/',
            friend: pathName === '/friend',
            reels: pathName === '/reels',
            massg: pathName === '/message',
            notify: pathName === '/notification'
        }

        // @ts-ignore
        const computedStyle = window.getComputedStyle(f.current);
        const totalWidth = (parseInt(computedStyle.width.slice(0, -2)) - 280) / 4;
        setNavButtonHover(data)
        setNavButtonPosition(40 + (totalWidth * indexToSet) + (40 * indexToSet))
        console.log(40 + (totalWidth * indexToSet) + (40 * indexToSet))
    }, []);

    return (
        <motion.div
            initial={initial}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            transition={{ duration: 0.5 }}
            className={`h-[70px] fixed bg-default-200/70 bottom-2 rounded-2xl py-2 left-[5px]`}
            style={{ width: 'calc(100% - 10px)'}}
        >
            <ul ref={f} className={'relative w-full h-full px-10 flex items-center justify-between'}>
                <li className={'w-[40px] relative flex flex-col gap-y-2 items-center justify-between'}>
                    <Badge shape="circle" color="danger" size={"md"} className={'bg-red-500'} showOutline={false}>
                        <Button
                            as={Link}
                            href={'/'}
                            isIconOnly
                            aria-label="more than 99 notifications"
                            variant="light"
                            size={"sm"}
                            onClick={() => setNavButton('home')}
                            className={`${navButtonHover['home'] && '-translate-y-[40px]'} z-50`}
                        >
                            <GetIcon name={'home'} className={`${pathName === '/' ? 'text-black' : ''}`}/>
                        </Button>
                    </Badge>
                    <span
                        className={`absolute opacity-0 translate-y-[80px] duration-400 ${navButtonHover["home"] ? '!opacity-100 !translate-y-[15px]' : ''} `}>
                                    Home
                                </span>
                </li>
                <li className={'w-[40px] relative flex flex-col gap-y-2 items-center justify-between'}>
                    <Badge shape="circle" color="danger" size={"md"} showOutline={false}>
                        <Button
                            as={Link}
                            href={'/friend'}
                            radius="full"
                            isIconOnly
                            aria-label="more than 99 notifications"
                            variant="light"
                            size={'sm'}
                            onClick={() => setNavButton('friend')}
                            className={`${navButtonHover['friend'] && '-translate-y-[40px]'} z-50`}
                        >
                            <GetIcon name={'friend'}
                                     className={pathName === '/friend' ? 'text-black' : ''}/>
                        </Button>
                    </Badge>
                    <span
                        className={`absolute opacity-0 translate-y-[80px] duration-400 ${navButtonHover["friend"] ? '!opacity-100 !translate-y-[15px]' : ''} `}>
                                    Friend
                                </span>
                </li>
                <li className={'w-[40px] relative flex flex-col gap-y-2 items-center justify-between'}>
                    <Badge shape="circle" color="danger" size={"md"} showOutline={false}>
                        <Button
                            as={Link}
                            href={'/reels'}
                            isIconOnly
                            aria-label="more than 99 notifications"
                            variant="light"
                            size={"sm"}
                            onClick={() => setNavButton('reels')}
                            className={`${navButtonHover['reels'] && '-translate-y-[40px]'} z-50`}
                        >
                            <GetIcon name={'video-reels'}
                                     className={pathName === '/reels' ? 'text-black' : ''} size={10}/>
                        </Button>
                    </Badge>
                    <span
                        className={`absolute opacity-0 translate-y-[80px] duration-400 ${navButtonHover["reels"] ? '!opacity-100 !translate-y-[15px]' : ''} `}>
                                    Reels
                                </span>
                </li>
                <li className={'w-[40px] relative flex flex-col gap-y-2 items-center justify-between'}>
                    <Badge shape="circle" color="danger" size={"md"} showOutline={false}>
                        <Button
                            as={Link}
                            href={'/message'}
                            isIconOnly
                            aria-label="more than 99 notifications"
                            variant="light"
                            size={"sm"}
                            onClick={() => setNavButton('message')}
                            className={`${navButtonHover['massg'] && '-translate-y-[40px]'} z-50`}
                        >
                            <GetIcon name={'message'}
                                     className={`${pathName === '/message' ? 'text-black' : ''}`}
                                     size={10}/>
                        </Button>
                    </Badge>
                    <span
                        className={`absolute opacity-0 translate-y-[80px] duration-400 ${navButtonHover["massg"] ? '!opacity-100 !translate-y-[15px]' : ''} `}>
                                    Message
                                </span>
                </li>
                <li className={'w-[40px] relative flex flex-col gap-y-2 items-center justify-between'}>
                    <Badge shape="circle" color="danger" size={"md"} showOutline={false}>
                        <Button
                            as={Link}
                            href={'/notification'}
                            isIconOnly
                            size={"sm"}
                            aria-label="more than 99 notifications"
                            variant="light"
                            onClick={() => setNavButton('notification')}
                            className={`${navButtonHover['notify'] && '-translate-y-[40px]'} z-50`}
                        >
                            <GetIcon name={'notification'}
                                     className={pathName === '/notification' ? 'text-black' : ''}/>
                        </Button>
                    </Badge>
                    <span
                        className={`absolute opacity-0 translate-y-[80px] duration-400 ${navButtonHover["notify"] ? '!opacity-100 !translate-y-[15px]' : ''} `}>
                                    Notification
                                </span>
                </li>
                <div className={`nav-toggle-button absolute w-[70px] h-[70px] top-[-90%] bg-green-400 rounded-full duration-500 border-[6px] border-solid border-black`} style={{left: `${navButtonPosition - 15}px`}}></div>
            </ul>
        </motion.div>
    );
};

export default MobileNavbar;
