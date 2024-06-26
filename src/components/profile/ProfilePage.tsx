"use client"

import React from 'react';
import SettingNav from "@/components/setting/SettingNav";
import {Button, Image } from "@nextui-org/react";
import {GetIcon} from "@/components/GetIcon";
import ProfileContains from "@/components/profile";
import useScreenSize from "@/hooks/useScreenSize";
import { UserSType } from '@/interface/usertupe';

export const ProfilePage = ({userDetails} : {userDetails: UserSType}) => {

    const size = useScreenSize();

    return (
        <div className={'w-screen h-full flex flex-col items-center'}>
            <SettingNav isSearchIon/>
            <div className={'w-full h-auto max-w-[1024px] items-center relative flex flex-col'}>
                <div className={'w-full z-10 relative'}>
                    <Image
                        loading='lazy'
                        className={'w-screen max-h-96 object-cover'}
                        src={userDetails.profileImage.coverImageURL || "/images/pexels-pixabay-276452.jpg"}
                        alt={"hero"}
                    />
                    <div
                        className={'w-10 h-10 absolute bg-black flex items-center justify-center rounded-full right-3 bottom-2 z-30 border-[2px] border-solid border-gray-50'}>
                        <GetIcon name={"camera"} className={'!w-6 !h-6'}/>
                    </div>
                </div>
                <div
                    className={"relative left-[-28%] -mt-[72px] z-20 w-36 h-36 rounded-full overflow-hidden border-[6px] border-solid border-black"}>
                    <Image
                        className={'w-full h-full object-cover'}
                        src={userDetails.profileImage.profileImageURL || "/images/default-forground.png"}
                        alt={"hero"}
                    />
                    <div
                        className={'w-10 h-10 absolute right-3 bottom-4 bg-black flex items-center justify-center rounded-full z-50 border-[2px] border-solid border-gray-50'}>
                        <GetIcon name={"camera"} className={'!w-6 !h-6'}/>
                    </div>
                </div>
                <div className={"w-full h-auto absolute left-0 -bottom-[100px] flex flex-col px-5"}>
                    <div>
                        <h3 className={'text-2xl text-default-800/60 font-ubuntu'}>{userDetails.name}</h3>
                        <p className={'font-bold font-robot text-default-800/90 tracking-widest'}>598 <span
                            className={'text-default-800/60 font-normal'}>friend</span></p>
                    </div>
                    <div className={'w-full h-auto flex mt-2 items-center gap-x-2 justify-start'}>
                        <Button
                            color="primary"
                            variant="bordered"
                            className={'grow'}
                        >
                            {size && size >= 480 && <GetIcon name={'plus'} className={'!w-5 !h-5'}/>}
                            <span>Add to story</span>
                        </Button>
                        <Button color="default" variant="bordered" className={'grow'}>
                            {size && size >= 480 && <GetIcon name={'edit-pen'} className={'!w-5 !h-5'}/>}
                            <span>Edit profile</span>
                        </Button>
                        <Button color="default" variant="bordered" className={'grow'}>
                            <GetIcon name={'setting'} className={'!h-5 !w-5'}/>
                        </Button>
                    </div>
                </div>
            </div>
            <div className={'w-full max-w-[1024px] h-[3px] bg-default-300 mt-[110px]'}/>
            <ProfileContains userDetails={userDetails}/>
        </div>
    )
}
