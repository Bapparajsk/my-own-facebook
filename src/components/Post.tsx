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
    isImage: boolean
    containUrl: string | undefined
    like: number
    comment: number
    share: number
}


const Post = ({name, time, userImg, description, userActive, isImage, containUrl, like, comment, share}: Props) => {

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

    return (
        <>
            <div className={'w-full h-auto flex flex-col items-start justify-center gap-y-4 mb-5'}>
                <div className={'w-auto h-full flex flex-col'}>
                    <div className={'w-auto h-full flex gap-x-2 items-center justify-start'}>
                        <Badge color={'success'} shape={'circle'} showOutline={false} placement={'bottom-right'} content={userActive && ""}>
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
                    {isImage ? (
                        <Image
                            loading={'lazy'}
                            className={'w-screen h-auto object-cover'}
                            alt="NextUI hero Image with delay"
                            src={containUrl}
                        />
                    ) : (
                        <video className={'w-screen h-full object-cover'} controls preload={'https://th.bing.com/th/id/OIP.yQ5dqe9e_mtXsEk9EHo5IwHaKX?w=182&h=254&c=7&r=0&o=5&dpr=1.3&pid=1.7'}>
                            <source src={containUrl} type="video/mp4" />
                            <track
                                src="/path/to/captions.vtt"
                                kind="subtitles"
                                srcLang="en"
                                label="English"
                            />
                            Your browser does not support the video tag.
                        </video>
                    )}

                </div>
                <div className={'w-full h-auto flex items-center justify-center gap-x-2'}>
                    <Button color="primary" variant="shadow" className={'grow'}>
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
