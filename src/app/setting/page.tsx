"use client"

import React from 'react';
import SettingNav from "@/components/setting/SettingNav";
import UserList from "@/components/setting/UserList";
import {UserSetting} from "@/components/setting/UserSetting";

const Setting = () => {

    return (
        <div className={'w-full h-full'}>
            <SettingNav isSearchIon/>
            <div className={'w-full h-auto flex flex-col gap-y-3'}>
                <UserList/>
                <UserSetting/>
            </div>
        </div>
    );
};

export default Setting;
