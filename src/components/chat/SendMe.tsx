import React from 'react';
import {Button} from "@nextui-org/react";

const SendMe = ({message}: {message: string}) => {
    return (
        <Button color="success" variant="flat" className="max-w-60 h-auto py-3 self-end flex justify-center items-center text-start">
            <p className="whitespace-normal break-words">{message}</p>
        </Button>
    );
};

export default SendMe;
