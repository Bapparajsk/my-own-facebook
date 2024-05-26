"use client"
import {Avatar, Card, CardBody} from "@nextui-org/react";
import React from "react";
import {CommentProps} from "@/interface/component";

export const Comment = ({ name, comment, profileImageUrl } : CommentProps) => {
    return (
        <div className={'flex gap-x-2'}>
            <div>
                <Avatar
                    radius="full"
                    src={profileImageUrl}
                />
            </div>
            <Card>
                <CardBody className={'w-full h-full'}>
                    <strong className={'text-blue-300'}>{name}</strong>
                    <p>{comment}</p>
                </CardBody>
            </Card>
        </div>
    );
};
