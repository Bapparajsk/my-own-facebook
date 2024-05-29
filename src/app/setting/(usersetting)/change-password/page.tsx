"use client"

import React, {useEffect} from 'react';
import {UserDetails} from "@/components/verify/UserDetails";
import {Password} from "@/components/verify/Password";
import SettingNav from "@/components/setting/SettingNav";
import {Input} from "@nextui-org/react";

const PasswordPage = () => {

    return (
        <div className={'rounded-2xl w-auto h-auto bg-setting shadow-sm-box'}>
            <Password resetOldPass/>
        </div>
    );
};

export default PasswordPage;
