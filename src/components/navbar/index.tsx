"use client"

import React from 'react';
import TopLogo from "@/components/navbar/TopLogo";
import Nav from "@/components/navbar/Navbar";
import {usePathname} from "next/navigation";

const MainNavbar = () => {

    const pathname: string = usePathname();
    const hiddenPaths = [
        "/profile",
        "/search",
        "/setting/*",
        "/reels",
        "/sign-in",
        "/sign-up",
        '/friend/requests',
        '/friend/suggestions',
        '/friend/friends',
        '/notification',
        '/message/*',
        '/verify/*',
        '/profile/upload',
    ];
    // const shouldHideNavbar = hiddenPaths.includes(pathname);
    // console.log(shouldHideNavbar, pathname)

    function isPathHidden(currentPath: string): boolean {
        return hiddenPaths.some(path => {
            if (path === currentPath) {
                return true;
            }
            if (path.endsWith('/*')) {
                const basePath = path.slice(0, -2);
                return currentPath.startsWith(basePath);
            }
            return false;
        });
    }

    if (isPathHidden(pathname)) {
        return null;
    }

    return (
        <>
            <TopLogo />
            <Nav/>
        </>
    );
};

export default MainNavbar;
