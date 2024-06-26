import React from "react";

export interface SignIpInputs  {
    email: string
    password: string
}

export interface SignUpInputs extends SignIpInputs {
    userName: string
}

export interface signIconsTypes {
    alt: string
}

export interface NavbarContextType {
    navButtonPosition: number
    setNavButtonPosition: React.Dispatch<React.SetStateAction<number>>
    navButtonHover: {
        home : boolean,
        friend: boolean,
        reels: boolean,
        massg: boolean,
        notify: boolean
    }
    setNavButtonHover: React.Dispatch<React.SetStateAction<{
        home : boolean,
        friend: boolean,
        reels: boolean,
        massg: boolean,
        notify: boolean
    }>>;

    navBottomAnimation: boolean
    setNavBottomAnimation: React.Dispatch<React.SetStateAction<boolean>>
    nevTopAnimation: boolean
    setNevTopAnimation: React.Dispatch<React.SetStateAction<boolean>>
}

