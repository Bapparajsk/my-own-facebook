import React, {ReactNode} from 'react';
import SettingNav from "@/components/setting/SettingNav";

const SettingLayout = ({children}: {children: ReactNode}) => {
    return (
        <div className="w-full h-[100vh] flex items-center justify-center relative bg-setting">
            <div className={'absolute top-0 left-0'}>
                <SettingNav isUnder/>
            </div>
            {children}
        </div>
    );
};

export default SettingLayout;
