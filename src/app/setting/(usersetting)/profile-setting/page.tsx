import React from 'react';

import {ProfileSetting} from "@/components/setting/ProfileSetting";

const ProfileSettingPage = () => {
    return (
        <div className={'rounded-2xl w-auto h-auto bg-setting shadow-sm-box'}>
            <ProfileSetting/>
        </div>
    );
};

export default ProfileSettingPage;
