"use client";

import { useCallback, useState } from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Checkbox, Button} from "@nextui-org/react";
import {columns, users} from "@/app/teptData";
import { CheckIcon } from '@nextui-org/shared-icons';
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { formatName } from "@/utils/format";
import { m } from "framer-motion";
import { AnimatedCheckIcon } from "./AnimatedCheckIcon";

interface Friend {
    _id : string;
    name: string;
    role: string;
    profileImage: {profileImageURL: String | undefined}
    active: boolean;
    isSend?: boolean;
}

export default function Share() {

    const { data, status } = useQuery({
        queryKey: ["sharFriends"],
        queryFn: async () => {
            const token = localStorage.getItem("app-token");
            if (!token) {
                throw new Error("No token found");
            }

            const url = process.env.NEXT_PUBLIC_SERVER_URL;

            if (!url) {
                throw new Error("No url found");
            }

            const res = await axios.get(
                `${url}/api/friend/get-all?isAll=true&env=friends`,
                { headers: {token} }
            );

            return res.data.friends as Friend[];
        },
        retry: 2
    });

    const sharMutetion = useMutation({
        mutationFn: async ({id} : {id: string}) => {
            const token = localStorage.getItem("app-token");
            if (!token) {
                throw new Error("No token found");
            }

            const url = process.env.NEXT_PUBLIC_SERVER_URL;

            if (!url) {
                throw new Error("No url found");
            }

            // TODO: send request to server

            if (data) {
                for (let i = 0; i < data.length; i++) {
                    if (data[i]._id === id) {
                        data[i].isSend = true;
                        break;
                    }
                }
            }

            // return res.data;
        }
    });

    const renderCell = useCallback((user: Friend, columnKey: any) => {
        const userRole = user.role ? formatName(user.role, 24) : "No Role";
        const userName = user.name ? formatName(user.name, 24) : "No Name";

        switch (columnKey) {
            case "name":
                return (
                    <User
                        avatarProps={{
                            radius: "full",
                            src: "/images/default-forground.png",
                            isBordered: user.active,
                            showFallback: true,
                            color: "warning",
                            size: "md"
                        }}
                        description={userRole}
                        name={userName}
                        isFocusable={true}
                    >
                     {user.active && <Chip color="success">Active</Chip>}   
                    </User>
                )
            case 'send':
                return (
                    <Button
                        variant={user.isSend ? "shadow" : "ghost"}
                        color={user.isSend ? "success" : "primary"}
                        isDisabled={user.isSend}
                        onClick={() => sharMutetion.mutate({id: user._id})}
                    >
                        {/* <CheckIcon /> */}
                        {user.isSend ? <AnimatedCheckIcon/> : "Send" }
                    </Button>
                )
        }
    }, []);

    if (status === "pending") {
        return <p>Loading...</p>
    }

    return (
        <Table aria-label="Example table with custom cells">
            <TableHeader columns={columns}>
                <TableColumn key={'name'} align={"start"}>
                    NAME
                </TableColumn>
                <TableColumn key={'send'} align={"end"}>
                    {''}
                </TableColumn>
            </TableHeader>
            <TableBody items={data}>

                {(item) => (
                    <TableRow key={item._id}>
                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
