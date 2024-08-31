"use client"

import React from 'react';
import {Email} from "@/components/verify/Email";

const Page = () => {
    return (
        <div className={'w-full max-w-[500px]'}>
            <Email emails={undefined} token={null}/>
        </div>
    );
};

export default Page;
