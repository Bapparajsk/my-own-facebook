import React, { forwardRef } from 'react';
import {Button} from "@nextui-org/react";

const SendYou = forwardRef<HTMLButtonElement, {message: string}>(({ message }, ref) => {
    return (
        <Button
            ref={ref}
            color="primary"
            variant="flat"
            className={'max-w-60 h-auto py-3 self-start flex justify-center items-center text-start'}
        >
            <p className="whitespace-normal break-words">{message}</p>
        </Button>
    );
});

export default SendYou;
