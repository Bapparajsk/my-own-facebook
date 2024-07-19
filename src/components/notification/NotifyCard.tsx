"use client"

import React, {useMemo} from 'react';
import {Avatar, Badge, Popover, PopoverTrigger, PopoverContent, Button} from "@nextui-org/react";
import {GetIcon} from "@/components/GetIcon"
import { getColorName, getIconName } from '@/utils/Utils';

interface NotificationProps {
    Type: string
    createdAt: Date
    description: string
    image: string | undefined
    isvew: boolean
    name: string
    userId: string
    idx: number
}


const NotifyCard = ({Type, description, image , isvew, name, createdAt} : NotificationProps) => {
    const PopUpcContent = useMemo(() => {
        return (
            <PopoverContent>
                <div className="px-1 py-2">
                    <Button color="danger" variant="flat">
                        Delete
                    </Button>
                </div>
            </PopoverContent>
        )
    }, []);

    return (
        <div className={`w-full h-auto flex gap-x-4  justify-between items-center ${isvew ? 'bg-default-200/50' : 'bg-default-200'}  pl-2 py-1 rounded-[20px]`}>
            <div className={'w-auto h-full self-start'}>
                <Badge
                    isOneChar
                    content={ <GetIcon name={getIconName(Type)} className={'!w-4 !h-4'}/>}
                    disableAnimation={false}
                    color={getColorName(Type)}
                    className={'w-8 h-8 '}
                    size={'lg'}
                    shape="circle"
                    placement='bottom-right'
                >
                    <Avatar
                        radius="full"
                        size="lg"
                        className="w-20 h-20 text-large"
                        src={image || 'images/pexels-pixabay-276452.jpg'}
                    />
                </Badge>
            </div>
            <div className={'w-full h-full flex flex-col items-start justify-center'}>
                <p>{name && (<strong className={'text-blue-300'}>{name}</strong>)} {description}</p>
                <br/>
                <p>{new Date(createdAt).toDateString()}</p>
            </div>
            <div className={'w-full h-full flex items-center justify-center max-w-10 '}>
                <Popover backdrop={'blur'} key={'right-start'} placement={'right-start'} color="default">
                    <PopoverTrigger>
                        <Button color="danger" variant="light" className="capitalize" size={'sm'} isIconOnly={true}>
                            <GetIcon name={'notify-setting'} className={'!w-auto !h-auto'}/>
                        </Button>
                    </PopoverTrigger>
                    {PopUpcContent}
                </Popover>
            </div>
        </div>
    );
};

export default NotifyCard;
