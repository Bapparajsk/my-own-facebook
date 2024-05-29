"use client"

import React from 'react';
import {Avatar, Badge, Popover, PopoverTrigger, PopoverContent, Button} from "@nextui-org/react";
import {GetIcon} from "@/components/GetIcon"

interface NotificationProps {
    imgSrc: string
    content: string
    isOpen: boolean
    relasotion: string
    name?: string
}


const getIconName = (name: string): string => {
    if (name === "like") {
        return 'like'
    } else if (name === "comment") {
        return 'message'
    } else if (name === "frient-request") {
        return 'friend'
    } else {
        return 'notify-video'
    }
}

const getColorName = (name: string): "primary" | "success" | "danger" | undefined => {
    if (name === "like" || name === "frient-request") {
        return 'primary';
    } else if (name === "comment") {
        return 'success';
    } else {
        return 'danger';
    }
}

const NotifyCard = ({imgSrc, content, isOpen, relasotion, name} : NotificationProps) => {
    const PopUpcontent = (
        <PopoverContent>
            <div className="px-1 py-2">
                <Button color="danger" variant="flat">
                    Delete
                </Button>
            </div>
        </PopoverContent>
    );


    return (
        <div className={`w-full h-auto flex gap-x-4  justify-between items-center ${isOpen ? 'bg-default-200/50' : 'bg-default-200'}  pl-2 py-1 rounded-[10px]`}>
            <div className={'w-auto h-full self-start'}>
                <Badge
                    isOneChar
                    content={ <GetIcon name={getIconName(relasotion)} className={'!w-4 !h-4'}/>}
                    disableAnimation={false}
                    color={getColorName(relasotion)}
                    className={'w-8 h-8 '}
                    size={'lg'}
                    shape="circle"
                    placement='bottom-right'
                >
                    <Avatar
                        radius="full"
                        size="lg"
                        className="w-20 h-20 text-large"
                        src={imgSrc}
                    />
                </Badge>
            </div>
            <div className={'w-full h-full flex flex-col items-start justify-center'}>
                <p>{name && (<strong className={'text-blue-300'}>{name}</strong>)} {content}</p>
                <br/>
                <p>May 15 at 5:58PM</p>
            </div>
            <div className={'w-full h-full flex items-center justify-center max-w-10 '}>
                <Popover key={'right-start'} placement={'right-start'} color="default">
                    <PopoverTrigger>
                        <Button color="danger" variant="light" className="capitalize" size={'sm'} isIconOnly={true}>
                            <GetIcon name={'notify-setting'} className={'!w-auto !h-auto'}/>
                        </Button>
                    </PopoverTrigger>
                    {PopUpcontent}
                </Popover>
            </div>
        </div>
    );
};

export default NotifyCard;
