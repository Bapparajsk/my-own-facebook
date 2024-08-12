import React, { forwardRef } from 'react';
import {Button} from "@nextui-org/react";

const getDate = (time: Date) => {

    const date = new Date(time);

    // return if the date is today return the time only else return the date and time time is 12 hours
    if (date.toDateString() === new Date().toDateString()) {
        return date.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'});
    } else {
        return date.toLocaleString('en-US', {month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'});
    }
}

const SendMe = forwardRef<HTMLButtonElement, {message: string, time: Date}>(({ message, time }, ref) => {
    return (
        <Button 
            ref={ref}
            color={"success"} 
            variant={"flat"}
            className={"max-w-60 h-auto py-3 self-end flex justify-center items-center text-start"}
        >
            <p className="whitespace-normal break-words">{message}</p>
            <span 
                className={'text-[10px] text-default-500 translate-y-3 ml-1'}
            >
                {getDate(time)}
            </span>
        </Button>
    );
});



export default SendMe;
