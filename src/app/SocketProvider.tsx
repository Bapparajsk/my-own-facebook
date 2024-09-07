"use client"

import { useEffect, ReactNode } from "react";
import { initializeSocket } from "@/utils/socket";
import { useUserContext } from "@/context/UserProvider";

export const SocketProvider = ({children}: {children: ReactNode}) => {
    const { userDetails } = useUserContext();

    useEffect(() => {
        const socket = initializeSocket(); // Initialize socket connection
    
        // Handle connection event
        socket.on("connect", () => {
          console.log("Connected to server");
        });
    
        if (userDetails?._id) {
            console.log(userDetails?._id, "userDetails._id");
            
            socket.emit("newUser", userDetails._id);
        }
    
        // Clean up on unmount
        return () => {
          socket.off("connect");
          socket.off("message");
        };

    }, [userDetails]);

    return (
        <>
            {children}
        </>
    )
}
