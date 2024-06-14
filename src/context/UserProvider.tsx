"use client"

import React, {createContext, Dispatch, SetStateAction, useContext, useState} from 'react';
import {UserSType} from "@/interface/usertupe";

interface UserContextType {
    userDetails: UserSType | undefined,
    setUserDetails: Dispatch<SetStateAction<UserSType | undefined>>
}

const UserContext = createContext<UserContextType>({
    userDetails: undefined,
    setUserDetails: () => {}
});

const UserProvider = ({ children }: Readonly<{children: React.ReactNode}>) => {

    const [userDetails, setUserDetails] = useState<UserSType>()

    // @ts-ignore
    return (
        <UserContext.Provider
            value={{
                setUserDetails,
                userDetails
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
