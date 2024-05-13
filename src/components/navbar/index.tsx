"use client"

import React from 'react';
import TopLogo from "@/components/navbar/TopLogo";
import Nav from "@/components/navbar/Navbar";
import {usePathname} from "next/navigation";

const MainNavbar = () => {

    const pathname = usePathname();
    const pathIdx = ["/profile", "/search", "/setting", "/reels", "/sign-in", "/sign-up"].indexOf(pathname);
    if (pathIdx !== -1) {
        return null;
    }

    console.log(pathname);

    return (
        <>
            <TopLogo />
            <Nav/>
        </>
    );
};

export default MainNavbar;
