"use client"

import React, {createContext, useContext, useEffect, useState} from 'react';
import {NavbarContextType} from "@/types/inputTypes";


const NavbarContext = createContext<NavbarContextType | undefined>(undefined);

const NavProvider = ({ children }: Readonly<{children: React.ReactNode}>) => {

    const [navBottomAnimation, setNavBottomAnimation] = useState<boolean>(true);
    const [nevTopAnimation, setNevTopAnimation] = useState<boolean>(true)
    const [navButtonPosition, setNavButtonPosition] = useState<number>(40)
    const [navButtonHover, setNavButtonHover] = useState({
        home : false,
        friend: false,
        reels: false,
        massg: false,
        notify: false
    });

    return (
        <NavbarContext.Provider
            value={{
                navButtonPosition,
                setNavButtonPosition,
                navButtonHover,
                setNavButtonHover,
                navBottomAnimation,
                setNavBottomAnimation,
                nevTopAnimation,
                setNevTopAnimation
            }}
        >
            {children}
        </NavbarContext.Provider>
    );
};

const useNavContext = (): NavbarContextType => {
    const context = useContext(NavbarContext);
    if (!context) {
        throw new Error('useNavContext must be used within a NavProvider');
    }
    return context;
};

export { NavProvider, useNavContext };
