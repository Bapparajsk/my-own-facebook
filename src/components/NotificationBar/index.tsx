"use client"

import React, { forwardRef } from 'react'
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { colors, getPosition } from './Utils';
import { NotyProps, ToastDetails } from './types';
import { useRouter } from "next/navigation";

interface Name {
    fontSize: string;
    name: string;
    message: string
}

const getName = (isFull: boolean | undefined, contain?: {name?: string, message?: string}): Name => {
    let name = contain?.name || '';
    let message = contain?.message || '';

    if (isFull) {
        return {
            fontSize: 'text-[10px]',
            name,
            message
        }
    }

    if (name.length > 10) {
        name = name.slice(0, 10) + '...';
    }

    if (message.length > 20) {
        message = message.slice(0, 20) + '...';
    }

    return {
        fontSize: 'text-[14px]',
        name,
        message
    }
}

const NotificationBar = forwardRef<HTMLDivElement, NotyProps>(({
    heading, contain, type, startIcon, remove,
    redies, shadow, position, endIcon, link, userLink,
    isNameFull
}, ref) => {
    const router = useRouter();
    const details: ToastDetails = type ? colors(type) : colors('default');
    const length = (contain?.message?.length || 0) + (contain?.name?.length || 0);
    const Position = position ? getPosition(position) : getPosition('top-right');
    const boxShadow = shadow === 'sm' ? 'shadow-sm' : shadow === 'md' ? 'shadow-md' : 'shadow-lg';
    redies = redies || 'md';

    const name: Name = getName(isNameFull, contain);

    return (
        <motion.div
            initial={{
                opacity: 0,
                x: 100
            }}
            animate={{
                opacity: 1,
                x: 0
            }}
            exit={{
                opacity: 0,
                x: 100
            }}
            transition={{
                duration: 0.3
            }}
            ref={ref}
            className={`w-auto h-[60px] rounded-${redies} ${details.backGround} p-2 flex gap-x-4 items-center absolute ${Position} ${boxShadow} z-50`}
        >
            <div className={'w-auto h-full flex items-center justify-center'} onClick={() => userLink && router.push(userLink)}>
                {heading ? heading : startIcon ? startIcon : details.HandIcon}
            </div>
            <div className={`w-40 ${name.fontSize}`}
                onClick={() => link && router.push(link)}
            >
                <p>
                    <span className={`${details.name.font} ${details.name.color}`}>{name.name}</span>
                    {contain?.name && contain?.message && <br/>}
                    <span className={`${details.message.font} ${details.message.color}`}>{name.message}</span>
                </p>
            </div>
            <div className={`w-[2px] h-full ${details.border}`} />
            <div className={'cursor-pointer '} onClick={() => {
                if (remove) {
                    remove();
                }
            }}>
                {endIcon ? endIcon : <ChevronRight color={details.iconColor} />}
            </div>
        </motion.div>
    )
});

export default NotificationBar;
