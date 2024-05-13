"use client"

import React from 'react';
import SettingNav from "@/components/setting/SettingNav";
import UserList from "@/components/setting/UserList";


const Setting = () => {

    return (
        <div className={'w-full h-full'}>
            <SettingNav/>
            {/*<Index/>*/}
            <UserList/>
        </div>
    );
};

export default Setting;
