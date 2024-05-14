"use client"

import React from 'react';
import {Badge, Avatar, Image, Button} from "@nextui-org/react";
import {GetIcon} from "@/components/GetIcon";

interface Props {
    name: string
    time: string
    userImg: string
    description: string
    userActive: boolean
    imgSrc: string
    like: number
    comment: number
    share: number
}

interface BadgeDate {
    color: string,
    shape: string,
    placement: string
    content?: string
}


const Post = ({name, time, userImg, description, userActive, imgSrc, like, comment, share}: Props) => {

    function formatNumber(num: number): string {
        if (num >= 1e9) {
            return (num / 1e9).toFixed(2) + 'B';
        } else if (num >= 1e6) {
            return (num / 1e6).toFixed(2) + 'M';
        } else if (num >= 1e3) {
            return (num / 1e3).toFixed(2) + 'K';
        } else {
            return num.toString();
        }
    }

    const badgeDate: BadgeDate = {
        color: "success",
        shape: "circle",
        placement: "bottom-right",
    }

    if (userActive) {
        badgeDate.content = "";
    }

    return (
        <>
            <div className={'w-full h-auto flex flex-col items-start justify-center gap-y-4 mb-5'}>
                <div className={'w-auto h-full flex flex-col'}>
                    <div className={'w-auto h-full flex gap-x-2 items-center justify-start'}>
                        <Badge color={'success'} shape={'circle'} placement={'bottom-right'} content={badgeDate.content}>
                            <Avatar
                                radius="full"
                                src={userImg}
                            />
                        </Badge>
                        <div className={'w-auto h-full flex flex-col items-start justify-center font-roboto-mono'}>
                            <p className={'font-bold tracking-[.8px] text-default-800/90'}>{name}</p>
                            <p className={'font-light text-default-500'}>{time}</p>
                        </div>
                    </div>
                    <div className={'w-3/4 h-full'}>
                        <pre className={'whitespace-pre-line font-plus-jakarta-ans'}>
                            {description}
                        </pre>
                    </div>
                </div>
                <div>
                    <Image
                        loading={'lazy'}
                        className={'w-screen h-auto object-cover'}
                        alt="NextUI hero Image with delay"
                        src={imgSrc}
                    />
                </div>
                <div className={'w-full h-auto flex items-center justify-center gap-x-2'}>
                    <Button color="primary" variant="flat" className={'grow'}>
                        <GetIcon name={'like'} className={'!w-6'}/>
                        <span>{formatNumber(like)}</span>
                    </Button>
                    <Button color="primary" variant="flat" className={'grow'}>
                        <GetIcon name={'comment'} className={'!w-6'}/>
                        <span>{formatNumber(comment)}</span>
                    </Button>
                    <Button color="primary" variant="flat" className={'grow'}>
                        <GetIcon name={'share'} className={'!w-6'}/>
                        <span>{formatNumber(share)}</span>
                    </Button>
                </div>
            </div>
            <hr className="border-none h-[1px] bg-default-300 text-red-800 mb-4"/>
        </>
    );
};

export default Post;
