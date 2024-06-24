"use client"

import React, {createContext, Dispatch, SetStateAction, useContext, useState} from 'react';
import {UserSType} from "@/interface/usertupe";
import { useRouter } from 'next/navigation';
import { useToasterContext } from '@/context/ToasterContext';
import { useQuery } from "@tanstack/react-query"
import axios from "axios";
import { log } from 'console';

interface UserContextType {
    userDetails: UserSType | undefined,
    setUserDetails: Dispatch<SetStateAction<UserSType | undefined>>
    fetchUser: () => void
}

const UserContext = createContext<UserContextType>({
    userDetails: undefined,
    setUserDetails: () => {},
    fetchUser: () => {}
});

const UserProvider = ({ children }: Readonly<{children: React.ReactNode}>) => {

    const [userDetails, setUserDetails] = useState<UserSType>()
    const router = useRouter();


    const { setToastDetail } = useToasterContext();

    function createdHeaders (token: string) {
        return {
            token: token,
            containerType: 'application/json'
        }
    }

    const fetchUser = async () => {
        try {
            const app_Token = localStorage.getItem('app-token');
            if (app_Token === null) {
                router.replace('/sign-up');
                return;
            }
        
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user`,
                {headers: createdHeaders(app_Token)}
            )
            const { user } = res.data;
            
            setUserDetails(user as UserSType);
            return user;
        } catch (error) {
            console.log(error);
            // @ts-ignore
            router.replace('/sign-up');
        }
    }



    return (
        <UserContext.Provider
            value={{
                setUserDetails,
                userDetails,
                fetchUser
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useNavContext must be used within a NavProvider');
    }
    return context;
};

export { UserProvider, useUserContext };
