"use client"

import React, {createContext, useContext, useEffect, useState} from 'react';
import {UserSType} from "@/interface/usertupe";

const UserContext = createContext(undefined);

const UserProvider = ({ children }: Readonly<{children: React.ReactNode}>) => {

    const [userDetails, setUserDetails] = useState<UserSType>()

    const setNewUser = (user: UserSType) => {
        setUserDetails(user);
    }

    const getUserDetails = () => {
        return userDetails;
    }

    // @ts-ignore
    return (
        <UserContext.Provider
            // @ts-ignore
            value={{
                setNewUser,
                getUserDetails
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
