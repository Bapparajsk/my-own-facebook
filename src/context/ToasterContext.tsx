"use client"

import NotificationBar from '@/components/NotificationBar';
import React, {createContext, useContext, useEffect, useState} from 'react';
import { AnimatePresence } from "framer-motion"
import { NotyProps } from '@/components/NotificationBar/types';
import { getSocket } from '@/utils/socket';
import { Socket } from 'socket.io-client';
import { Avatar } from '@nextui-org/react';
export interface ToastDetails {
    message: string;
    type: "success" | "warning" | "error" | "loading";
    duration?: number;
}

interface ToasterContextType {
    setNotyDetails: (details: NotyProps) => void;
}

const ToasterContext = createContext<ToasterContextType>({
    setNotyDetails: (details: NotyProps) => {},
});

const ToasterProvider = ({ children }: Readonly<{children: React.ReactNode}>) => {
    const [show, setShow] = useState<boolean>(false);
    const [id, setId] = useState<NodeJS.Timeout | undefined>(undefined);
    const [tempDetails, setTempDetails] = useState<NotyProps | undefined>(undefined);
    const [details, setDetails] = useState<NotyProps | undefined>(undefined);

    const socket: Socket  = getSocket();

    const setNotyDetails = async ({
        heading,
        contain,
        type,
        startIcon,
        redies,
        shadow,
        position,
        endIcon,
        link,
        userLink,
        isNameFull
    } : NotyProps) => {

        if (show) {
            clearTimeout(id);
            setShow(false);
            await new Promise((res) => setTimeout(res, 500));
        }
        
        setShow(true);
        setTempDetails({
            heading,
            contain,
            type,
            startIcon,
            redies,
            shadow,
            position,
            endIcon,
            link,
            userLink,
            isNameFull
        });
    }

    socket.on("new-post", (postData) => {
        console.log("new post", postData);
        
        setNotyDetails({
            startIcon: <Avatar src={postData.userImage || ""} size="md" />,
            contain: {
                name: postData.userName,
                message: "New post"
            },
            type: "info",
            link: `/share-post?postId=${postData.postId}`
        })
    });

    useEffect(() => {
        if (show) {
            const timeout = setTimeout(() => {
                setShow(false);
            }, 5000);
            setId(timeout);

            setDetails(tempDetails);

            return () => clearTimeout(timeout);
        }
    }, [show, tempDetails]); 



    return (
        <ToasterContext.Provider
            value={{
                setNotyDetails,
            }}
        >
            <AnimatePresence>
                {show && <NotificationBar
                    remove={() => {
                        clearTimeout(id);
                        setShow(false);
                    }}
                    {...details}
                />}
            </AnimatePresence>
            {children}
        </ToasterContext.Provider>
    );
};

const useToasterContext = () => {
    const context = useContext(ToasterContext);
    if (!context) {
        throw new Error('useNavContext must be used within a NavProvider');
    }
    return context;
};

export { ToasterProvider, useToasterContext };
