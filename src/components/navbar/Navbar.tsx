"use client"

import React, {useEffect, useState} from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Badge, Button} from "@nextui-org/react";
import Link  from 'next/link';
import { usePathname } from "next/navigation"
import useScreenSize from "@/hook/useScreenSize";
import {GetIcon} from "@/components/GetIcon";
import MobileNavbar from "@/components/navbar/MobileNavbar";

export default function Nav(): React.JSX.Element {

    const pathName = usePathname();
    const size = useScreenSize();


    return (
        <>
            {
                size && size > 640 ? (
                    <Navbar position="static" shouldHideOnScroll className={`max-sm:fixed max-sm:bottom-0`}>
                        <NavbarBrand className="flex-grow-0">
                            <p className="font-bold text-inherit">Code</p>
                        </NavbarBrand>
                        <NavbarContent justify={'end'}  className={'gap-x-10 sm:gap-x-14 text-default-900'}>
                            <NavbarItem className={'flex items-center gap-x-2'}>
                                <Badge  shape="circle" color="danger" size={"md"}>
                                    <Button
                                        as={Link}
                                        href={'/'}
                                        isIconOnly
                                        aria-label="more than 99 notifications"
                                        variant="light"
                                        size={"sm"}
                                    >
                                        <GetIcon name={'home'} className={pathName === '/' ? 'text-blue-500' : ''}/>
                                    </Button>
                                </Badge>
                                {size && size > 768 && <span>Home</span>}
                            </NavbarItem>
                            <NavbarItem className={'flex items-center gap-x-2'}>
                                <Badge  shape="circle" color="danger" size={"md"}>
                                    <Button
                                        as={Link}
                                        href={'/friend'}
                                        radius="full"
                                        isIconOnly
                                        aria-label="more than 99 notifications"
                                        variant="light"
                                        size={'sm'}
                                    >
                                        <GetIcon name={'friend'} className={pathName === '/friend' ? 'text-blue-500' : ''}/>
                                    </Button>
                                </Badge>
                                {size && size > 768 && <span>Friend</span>}
                            </NavbarItem>
                            <NavbarItem className={'flex items-center gap-x-2'}>
                                <Badge  shape="circle" color="danger" size={"md"}>
                                    <Button
                                        as={Link}
                                        href={'/message'}
                                        isIconOnly
                                        aria-label="more than 99 notifications"
                                        variant="light"
                                        size={"sm"}
                                    >
                                        <GetIcon name={'video-reels'} className={pathName === '/message' ? 'text-blue-500' : ''} size={10}/>
                                    </Button>
                                </Badge>
                                {size && size > 768 && <span>Reels</span>}
                            </NavbarItem>
                            <NavbarItem className={'flex items-center gap-x-2'}>
                                <Badge shape="circle" color="danger" size={"md"}>
                                    <Button
                                        as={Link}
                                        href={'/message'}
                                        isIconOnly
                                        aria-label="more than 99 notifications"
                                        variant="light"
                                        size={"sm"}
                                    >
                                        <GetIcon name={'message'} className={pathName === '/message' ? 'text-blue-500' : ''}
                                                 size={10}/>
                                    </Button>
                                </Badge>
                                {size && size > 768 && <span>Message</span>}
                            </NavbarItem>
                            <NavbarItem className={'flex items-center gap-x-2'}>
                                <Badge  shape="circle" color="danger" size={"md"}>
                                    <Button
                                        as={Link}
                                        href={'/notification'}
                                        isIconOnly
                                        size={"sm"}
                                        aria-label="more than 99 notifications"
                                        variant="light"
                                    >
                                        <GetIcon name={'notification'} className={pathName === '/notification' ? 'text-blue-500' : ''}/>
                                    </Button>
                                </Badge>
                                {size && size > 768 && <span>Notification</span>}
                            </NavbarItem>
                        </NavbarContent>
                    </Navbar>
                ) : ( <MobileNavbar/> )
            }
        </>
    );
}


