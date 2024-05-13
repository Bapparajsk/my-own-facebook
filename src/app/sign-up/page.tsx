'use client'

import React from 'react';
import {Card} from "@nextui-org/card";
import {Form} from '@/components/sign-up/Form'

const Page = () => {
    return (
        <main className={'w-screen h-screen flex items-center justify-center overflow-hidden'}>
            <div className={'w-full h-screen flex items-center justify-center'}>
                <Card className={'w-[400px] h-auto p-10 border-style relative'}>
                    <Form/>
                </Card>
            </div>
        </main>
    );
};

export default Page;
