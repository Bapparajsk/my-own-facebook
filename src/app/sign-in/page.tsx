"use client"

import React from 'react';
import {Card} from "@nextui-org/card";
import {Form} from "@/components/sign-in/Form";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {GetIcon} from "@/components/GetIcon";

const Page = () => {
    console.log('Page sign page sdfjshdf asdiufhaseuihfw');
    
    const router = useRouter();
    const params = useSearchParams();
    const isTrue = params.get("create-new-account");

    return (
        <div className={'w-screen h-screen flex px-5 items-center justify-center overflow-hidden'}>
            {isTrue && <div onClick={() => router.back()} className={'flex gap-x-2 text-default-500 fixed top-2 left-2 z-30'}>
                <GetIcon name={'move-left'}/>
                <span>back</span>
            </div>}
            <Card className={'w-[400px] h-auto p-10 border-style relative'}>
                <Form/>
            </Card>
        </div>
    );
};

export default Page;
