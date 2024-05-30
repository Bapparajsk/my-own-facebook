"use client"

import {Card, CardBody, CardHeader, Button, PopoverContent, Popover, PopoverTrigger, dropdown} from "@nextui-org/react";
import React, {useMemo, useState} from "react";
import {GetIcon} from "@/components/GetIcon";
import {AtSign, Phone,Plus } from "lucide-react";
import { motion } from 'framer-motion';

const MotionCard = motion(Card);

export const ContactInformation = () => {
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

    const [DropDown, setDropDown] = useState(false);

    return (
        <Card className="w-full max-w-[500px] px-5 py-2 flex flex-col bg-transparent/50 backdrop-blur-[5px] duration-500">
            <CardHeader className="flex-col items-start space-y-2">
                <h2 className={'text-2xl font-bold'}>Contact Information</h2>
                <p className={'font-light text-sm'}>Manage your mobile numbers and email addresses to make sure that your contact info is accurate and up to date.</p>
            </CardHeader>
            <CardBody className="gap-y-2">
                <div className={'flex px-4 py-1.5 bg-default-200/50 rounded-2xl justify-between'}>
                    <div className="flex items-center justify-center gap-x-2 text-white">
                        <AtSign size={20} />
                        <span>bapparaj@gmail.com</span>
                    </div>
                    <Popover backdrop={'blur'} key={'right-start'} placement={'right-start'} color="default">
                        <PopoverTrigger>
                            <Button color="danger" variant="light" className="capitalize" size={'sm'} isIconOnly={true}>
                                <GetIcon name={'notify-setting'} className={'!w-auto !h-auto'}/>
                            </Button>
                        </PopoverTrigger>
                        {PopUpcContent}
                    </Popover>
                </div>
                <div className={'flex px-4 py-1.5 bg-default-200/50 rounded-2xl justify-between'}>
                    <div className="flex items-center justify-center gap-x-2 text-white">
                        <Phone size={20}/>
                        <span>bapparaj@gmail.com</span>
                    </div>
                    <Popover backdrop={'blur'} key={'right-start'} placement={'right-start'} color="default">
                        <PopoverTrigger>
                            <Button color="danger" variant="light" className="capitalize" size={'sm'} isIconOnly={true}>
                                <GetIcon name={'notify-setting'} className={'!w-auto !h-auto'}/>
                            </Button>
                        </PopoverTrigger>
                        {PopUpcContent}
                    </Popover>
                </div>
                <Button onPress={() => setDropDown(!DropDown)} color="warning" variant="flat" className={'py-2 justify-start'}>
                    <Plus />
                    Add new contact
                </Button>
                {
                    DropDown && (
                        <MotionCard
                            className={'py-1 bg-transparent shadow-2xl'}
                            initial={DropDown && { scale: 0.9 }}
                            animate={DropDown && { scale: 1 }}
                            transition={DropDown && {duration: 0.2, ease: 'linear'}}
                        >
                            <CardBody className="px-5 gap-y-3">
                                <Button color="secondary" variant="shadow">
                                    <Phone size={20}/>
                                    <span>Add mobil number</span>
                                </Button>
                                <Button color="secondary" variant="shadow">
                                    <AtSign size={20} />
                                    <span>Add email address</span>
                                </Button>
                            </CardBody>
                        </MotionCard>
                    )
                }
            </CardBody>
        </Card>
    );
};
