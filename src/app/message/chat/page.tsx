"use client"

import React from 'react';
import {usePathname } from 'next/navigation'

const Page = () => {

    const pathName = usePathname()

    return (
        <div>
            <h1>{pathName}</h1>
        </div>
    );
};

export default Page;
