"use client"

import { useEffect } from "react";
import { initializeSocket } from "../utils/socket";
import { useUserContext } from "@/context/UserProvider";

export const SocketProvider = ({children}: {children: React.ReactNode}) => {

    const { userDetails } = useUserContext();

    useEffect(() => {
        const socket = initializeSocket();
    
        // Handle connection event
        socket.on("connect", () => {
          console.log("Connected to server");
        });
        console.log(userDetails, "userDetails");
    
        if (userDetails?._id) {
            console.log(userDetails?._id, "userDetails._id");
            
            socket.emit("newUser", userDetails._id);
        }

        // Handle custom events
        socket.on("message", (message: string) => {
          console.log("Received message:", message);
        });
    
        // Clean up on unmount
        return () => {
          socket.off("connect");
          socket.off("message");
        };

    }, [userDetails?._id]);

    return (
        <>
            {children}
        </>
    )
}
