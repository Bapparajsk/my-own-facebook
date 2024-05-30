"use client"

import React from 'react';
import { useSearchParams } from 'next/navigation'
import {EventType} from "@/components/setting/EventType";


const Page = () => {

    const searchParams  = useSearchParams();
    const env = searchParams.get('env');

    return (
        <div className={'w-full h-screen flex items-center justify-center'}>
            <EventType env={env}/>
        </div>
    );
};

export default Page;
