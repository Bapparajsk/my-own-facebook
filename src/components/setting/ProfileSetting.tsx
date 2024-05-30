"use client"

import React from "react";
import {CardHeader, Avatar, Card, CardBody} from "@nextui-org/react";
import {CircleUserRound, ShieldCheck, Cake, Image, NotebookText} from "lucide-react";
import {ProfileSettingButton} from "@/components/setting/ProfileSettingButton";

export const ProfileSetting = () => {
    return (
        <Card className="w-[350px] max-w-[500px] px-5 flex flex-col gap-y-2 bg-transparent/50 backdrop-blur-[5px]">
            <CardHeader className={'flex flex-col items-center justify-center'}>
                <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" className="w-24 h-24 text-large" />
                <h3 className={'font-bold text-2xl'}>Bapparaj Sk</h3>
                <p className={'font-light text-sm'}>Software Engining</p>
            </CardHeader>
            <CardBody className={'gap-y-2'}>
                <ProfileSettingButton name={'Name'} link={'name'} icon={<CircleUserRound/>}/>
                <ProfileSettingButton name={'Role'} link={'role'} icon={<NotebookText/>}/>
                <ProfileSettingButton name={'Contact info'} link={'contact-information'} icon={<ShieldCheck />}/>
                <ProfileSettingButton name={'Date of birth'} link={'date-of-birth'} icon={<Cake />}/>
                <ProfileSettingButton name={'Profile picture'} link={'profile-picture'} icon={<Image />}/>
            </CardBody>
        </Card>
    );
};
