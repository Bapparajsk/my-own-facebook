"use client"

import React from "react";
import {ChevronLeft, Plus} from "lucide-react";
import {Card, Avatar, CardBody, CardHeader, Button} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { UserSType } from "@/interface/usertupe";

export const ProfilePicture = ({user} : {user: UserSType}) => {

    const router = useRouter();

    return (
        <Card className="w-screen max-w-[500px] px-5 py-2 flex flex-col bg-transparent/50 backdrop-blur-[5px] duration-500">
            <CardHeader>
                <div className="w-full">
                    <div className="flex flex-col items-start justify-center gap-y-2">
                        <ChevronLeft onClick={() => router.back()}/>
                        <span className={'text-xl'}>Profile picture</span>
                    </div>
                    <div className="flex flex-col items-center justify-center mt-10">
                        <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" className="w-40 h-40 text-large" />
                    </div>
                </div>
            </CardHeader>
            <CardBody >
                <Button color="default" variant={'flat'} className={'justify-start'}>
                    <Plus/>
                    <span>Upload new photo</span>
                </Button>
            </CardBody>
        </Card>
    );
};
