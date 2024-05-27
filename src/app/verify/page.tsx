"use client"

import React from 'react';
import {Email} from "@/components/verify/Email";
import {Password} from "@/components/verify/Password";

const Verify = () => {


    return (
        <div className="w-full h-[100vh] flex items-center justify-center">
            {/*<Email/>*/}
            <Password/>
        </div>
    );
};

export default Verify;
