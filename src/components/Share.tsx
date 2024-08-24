"use client";

import { Fragment, useCallback, useEffect } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Button } from "@nextui-org/react";
import { columns } from "@/app/teptData";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { formatName } from "@/utils/format";
import { AnimatedCheckIcon } from "./AnimatedCheckIcon";
import { useToasterContext } from "@/context/ToasterContext";

export interface Friend {
    _id: string;
    idx: number;
    name: string;
    role: string;
    profileImage: { profileImageURL: string | undefined }
    active: boolean;
    isSend?: boolean;
}

export default function Share({ shareFriend, isLoding, postId, setShareFriend, setPostShareCount }:
    { shareFriend: Friend[], isLoding: boolean, postId: string, setShareFriend: (data: Friend[]) => void, setPostShareCount: () => void }) {
    
    const { setNotyDetails } = useToasterContext();

    const sharMutation = useMutation({
        mutationFn: async ({ id, idx }: { id: string, idx: number }) => {
            const token = localStorage.getItem("app-token");
            if (!token) {
                throw new Error("No token found");
            }

            if (shareFriend && shareFriend[idx].isSend) {
                return { id, idx, isSend: true };
            }

            const url = process.env.NEXT_PUBLIC_SERVER_URL;

            if (!url) {
                throw new Error("No url found");
            }

            // TODO: send request to server
            await axios.post(
                `${url}/api/friend/share-post`,
                {
                    friendId: id,
                    postId: postId
                },
                {
                    headers: {
                        token: token
                    }
                }
            );

            return { id, idx, isSend: false };
        },
        onSuccess: (data) => {
            if (!data.isSend) {
                const newShareFriend = [...shareFriend];
                newShareFriend[data.idx].isSend = true;
                setShareFriend(newShareFriend);
                setPostShareCount();
            };
        },
        onError: (error) => {
            setNotyDetails({
                type: "error",
                contain: {
                    name: "Error",
                    message: error.message || "Something went wrong"
                },
                
            });
        }
    });

    useEffect(() => {

        return () => {

            if (sharMutation.isPending) {
                sharMutation.reset();
            }
        }

    },  [sharMutation]);


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
    }, [shareFriend]);

    return (
        <Fragment>
            {isLoding ? "loding" : (
                <Table aria-label="Example table with custom cells">
                    <TableHeader columns={columns}>
                        <TableColumn key={'name'} align={"start"}>
                            NAME
                        </TableColumn>
                        <TableColumn key={'send'} align={"end"}>
                            {''}
                        </TableColumn>
                    </TableHeader>
                    <TableBody>
                        {
                            shareFriend.map((item, idx) => (
                                <TableRow key={item._id}>
                                    {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            )}
        </Fragment>
    );
}