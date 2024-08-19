"use client";

import { Fragment, useCallback, useEffect } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Button } from "@nextui-org/react";
import { columns } from "@/app/teptData";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { formatName } from "@/utils/format";
import { AnimatedCheckIcon } from "./AnimatedCheckIcon";

interface Friend {
    _id: string;
    idx: number;
    name: string;
    role: string;
    profileImage: { profileImageURL: string | undefined }
    active: boolean;
    isSend?: boolean;
}

export default function Share() {
    const queryClient = useQueryClient();
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
                { headers: { token } }
            );

            return res.data.friends as Friend[];
        },
        retry: 2,
        
    });

    const sharMutation = useMutation({
        mutationFn: async ({ id, idx }: { id: string, idx: number }) => {
            const token = localStorage.getItem("app-token");
            if (!token) {
                throw new Error("No token found");
            }

            const url = process.env.NEXT_PUBLIC_SERVER_URL;

            if (!url) {
                throw new Error("No url found");
            }

            // TODO: send request to server

            return { id, idx };
        },
        onSuccess: ({ id, idx }) => {
            queryClient.setQueryData<Friend[]>(["sharFriends"], (oldData) =>
                oldData?.map((friend, index) =>
                    index === idx ? { ...friend, isSend: true } : friend
                )
            );
        },
        onError: (error) => {
            console.error("Error sharing:", error);
            // Handle error
        }
    });

    useEffect(() => {

        return () => {

            if (status === "pending") {
                queryClient.cancelQueries({ queryKey: ["sharFriends"], exact: true });
            }

            if (sharMutation.isPending) {
                sharMutation.reset();
            }
        }

    }, [status, sharMutation, queryClient]);

    const renderCell = useCallback((user: Friend, columnKey: any) => {
        const userRole = user.role ? formatName(user.role, 24) : "No Role";
        const userName = user.name ? formatName(user.name, 24) : "No Name";

        switch (columnKey) {
            case "name":
                return (
                    <User
                        avatarProps={{
                            radius: "full",
                            src: user.profileImage?.profileImageURL || "/images/default-forground.png",
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
                );
            case 'send':
                return (
                    <Button
                        variant={user.isSend ? "shadow" : "ghost"}
                        color={user.isSend ? "success" : "primary"}
                        isDisabled={user.isSend}
                        onClick={() => sharMutation.mutate({ id: user._id, idx: user.idx })}
                    >
                        {user.isSend ? <AnimatedCheckIcon /> : "Send"}
                    </Button>
                );
            default:
                return null;
        }
    }, [sharMutation]);

    return (
        <Fragment>
            {status === "pending" ? <p>Loading...</p> : status === "error" ? <p>Error</p> : status === "success" && data && data.length === 0 ? <p>No data found</p> : (
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
            )}
        </Fragment>
    );
}
