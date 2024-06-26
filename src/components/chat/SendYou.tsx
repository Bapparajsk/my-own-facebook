import React from 'react';
import {Button} from "@nextui-org/react";

const SendYou = ({message}: {message: string}) => {
    return (
        <Button color="primary" variant="flat" className={'max-w-60 h-auto py-3 self-start flex justify-center items-center text-start'}>
            <p className="whitespace-normal break-words">{message}</p>
        </Button>
    );
};

export default SendYou;
