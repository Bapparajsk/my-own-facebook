import React, { forwardRef } from 'react';
import {Button} from "@nextui-org/react";

const SendMe = forwardRef<HTMLButtonElement, {message: string}>(({ message }, ref) => {
    return (
        <Button 
            ref={ref}
            color={"success"} 
            variant={"flat"}
            className={"max-w-60 h-auto py-3 self-end flex justify-center items-center text-start"}
        >
            <p className="whitespace-normal break-words">{message}</p>
        </Button>
    );
});



export default SendMe;
