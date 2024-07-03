"use client"

import axios from 'axios';
import React, {createContext, useContext, useEffect, useState} from 'react';

export interface FriendType {
    _id: string
    name: string
    profileImage: {profileImageURL?: string}
}

export interface ParamitorType {
    envType: "send-request" | "friends" | "request"
    page?: number
    limit?: number
}

interface FriendsContextType {
    sendFriendRequest: FriendType[]
    friendRequest: FriendType[]
    getallFriendlist: ({envType, page, limit} : ParamitorType) => Promise<any>
    removeList: (name: "send" | "friend" | 'request') => void
    sendFriendrequest: (friendId: string) => void
    acceptFriendRequest: (friendId: string) => void
    rejectFriendRequest: (friendId: string) => void
}

const FriendsContext = createContext<FriendsContextType>({
    sendFriendRequest: [],
    friendRequest: [],
    getallFriendlist: async () => {},
    removeList: () => {},
    sendFriendrequest: async () => {},
    acceptFriendRequest: async () => {},
    rejectFriendRequest: async () => {}
});


const FriendsProvider = ({ children }: Readonly<{children: React.ReactNode}>) => {

    const [sendFriendRequest, setSendFriendRequest] = useState<FriendType[]>([]);
    const [friendRequest, setFriendRequest] = useState<FriendType[]>([]);

    const getallFriendlist = async ({envType, page, limit} : ParamitorType) => {

        console.log(envType, page, limit);
        
        const token = localStorage.getItem('app-token');
        if (!token) {
            throw new Error('Token not found');
        }

        const res = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/friend/get-all?env=${envType}&page=${page || 1}&limit=${limit || 10}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    token: token
                }
            }
        );

        const data = res.data.friends;
        console.log(data, envType);
        

        if (envType === "send-request") {
            setSendFriendRequest(data);
        } else if (envType === "request") {
            setFriendRequest(data);
        }
        return data;
    }

    const removeList = (name: "send" | "friend" | 'request') => {
        if (name === "send") {
            setSendFriendRequest([]);
        } else if (name === "friend") {
            setFriendRequest([]);
        }
    }

    const sendFriendrequest = async (friendId: string) => {
        const token = localStorage.getItem('app-token');
        if (!token) {
            throw new Error('Token not found');
        }

        const res = await axios.put(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/friend/send-request`,
            {
                friendId
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    token: token
                }
            }
        );

        console.log(res.data);
    }

    const acceptFriendRequest = async (friendId: string) => {
        const token = localStorage.getItem('app-token');
        if (!token) {
            throw new Error('Token not found');
        }

        const res = await axios.patch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/friend/accept-request`,
            {
                friendId
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    token: token
                }
            }
        );

        console.log(res.data);
    }

    const rejectFriendRequest = async (friendId: string) => {
        const token = localStorage.getItem('app-token');
        if (!token) {
            throw new Error('Token not found');
        }

        const res = await axios.patch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/friend/reject-request`,
            {
                friendId
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    token: token
                }
            }
        );

        console.log(res.data);
    }
   
    return (
        <FriendsContext.Provider
            value={{
                sendFriendRequest,
                friendRequest,
                getallFriendlist,
                removeList,
                sendFriendrequest,
                acceptFriendRequest,
                rejectFriendRequest
            }}
        >
            {children}
        </FriendsContext.Provider>
    );
};

const useFriendsContext = () => {
    const context = useContext(FriendsContext);
    if (!context) {
        throw new Error('useFriendsContext must be used within a FriendsProvider');
    }
    return context;
}

export { FriendsProvider, useFriendsContext };