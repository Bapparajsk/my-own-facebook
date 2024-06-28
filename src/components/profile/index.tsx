"use client"

import React from 'react';
import {Card, CardBody, CardFooter, Image, Avatar, Button, Divider} from "@nextui-org/react";
import Link from "next/link";
import {GetIcon} from "@/components/GetIcon";
import UserPosts from "@/components/profile/UserPosts";
import { UserSType } from '@/interface/usertupe';


const ProfileContains = ({userDetails}: {userDetails: UserSType}) => {

    return (
        <div className={'w-full max-w-[1024px] h-full mt-5 px-5 flex flex-col gap-y-3'}>
            <div className="relative gap-5 grid grid-cols-3 pt-8">
                <p className={'absolute font-bold font-robot text-default-800/90 tracking-widest'}>598 <span
                    className={'text-default-800/60 font-normal'}>friend</span></p>
                <Link href={'/friend'} className={'absolute right-0 text-blue-500'}>see All</Link>
                {
                    userDetails && Array.from(userDetails.friends).slice(0, 6).map(([key, value]) => (
                        <Card shadow="sm" key={String(key)} className={'h-auto'} isPressable onPress={() => console.log("item pressed")}>
                            <CardBody className="overflow-visible p-0">
                                <Image
                                    shadow="sm"
                                    radius="lg"
                                    width="100%"
                                    alt={value.name}
                                    className="w-full object-cover h-[100px]"
                                    src={value.image ? value.image : "https://i.ytimg.com/vi/YAwnAG9UXp4/hqdefault.jpg"}
                                />
                            </CardBody>
                            <CardFooter className="text-small justify-between">
                                <b>{value.name}</b>
                            </CardFooter>
                        </Card>
                    ))
                }
            </div>
            <hr className="border-none h-[1px] bg-default-300 text-red-800"/>
            <div className={'w-full h-full flex flex-col gap-y-4 mb-1'}>
                <div className={'w-full h-auto'}>
                    <p className={'font-bold font-ubuntu tracking-widest'}>Posts</p>
                </div>
                <div className={'w-full h-auto flex items-center gap-x-2 justify-start'}>
                    <Avatar
                        className={'cursor-pointer'}
                        src={userDetails.profileImage.profileImageURL || "/images/default-forground.png"}
                    />
                    <Button as={Link} href={'/profile/upload?env=image'} className={'grow justify-start font-robot text-medium'}>Post a status update</Button>
                    <Button
                        as={Link}
                        href={'/profile/upload?env=image'}
                        type={"button"}
                        variant={"flat"}
                        color={'success'}
                        isIconOnly
                    >
                        <GetIcon name={"image-upload"} className={'!w-6 text-green-500'} />
                    </Button>
                </div>
                <div className="flex h-5 items-center justify-center space-x-3 text-small">
                    <Button
                        as={Link}
                        href={'/profile/upload?env=image'}
                        type={"button"}
                        variant={"flat"}
                        color={'success'}
                    >
                        <GetIcon name={"image-upload"} className={'text-green-500'} />
                        Photo
                    </Button>
                    <Divider orientation="vertical"/>
                    <Button
                        as={Link}
                        href={'/profile/upload?env=video'}
                        type={"button"}
                        variant={"flat"}
                        color={'danger'}
                    >
                        <GetIcon name={"video"} className={'text-red-500'} />
                        Video
                    </Button>
                    <Divider orientation="vertical"/>
                    <Button
                        as={Link}
                        href={'/profile/upload?env=text'}
                        type={"button"}
                        variant={"flat"}
                        color={'primary'}
                    >
                        <GetIcon name={"text-file"} className={'text-blue-500'} />
                        Text
                    </Button>
                </div>
            </div>
            <hr className="border-none h-[1px] bg-default-300"/>
            <UserPosts userDetails={userDetails}/>
        </div>
    );
};

export default ProfileContains;
