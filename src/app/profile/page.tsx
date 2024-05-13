"use client"

import React from 'react';
import SettingNav from "@/components/setting/SettingNav";
import {Image} from "@nextui-org/image";
import {Button} from "@nextui-org/react";
import {GetIcon} from "@/components/GetIcon";
import ProfileContains from "@/components/profile";

const Profile = () => {
    return (
        <main className={'w-screen h-full flex flex-col items-center'}>
            <SettingNav/>
            <div className={'w-full h-auto max-w-[1024px] items-center relative flex flex-col'}>
                <div className={'w-full z-10 relative'}>
                    <Image
                        className={'w-screen max-h-96 object-cover'}
                        src={"https://scontent.fccu31-2.fna.fbcdn.net/v/t39.30808-6/405266294_883868466735789_4190385623778386864_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_ohc=WdoQtzZfhR0Q7kNvgHgTd5U&_nc_ht=scontent.fccu31-2.fna&oh=00_AYAfFWCD6it8LWVdnVHPHJc_TsmJP6D5NRZhUVsAaS2YqQ&oe=66477D72"}
                        alt={"hero"}
                    />
                    <div
                        className={'w-10 h-10 absolute bg-black flex items-center justify-center rounded-full right-3 bottom-2 z-30 border-[2px] border-solid border-gray-50'}>
                        <GetIcon name={"camera"} className={'!w-6 !h-6'}/>
                    </div>
                </div>
                <div
                    className={"relative left-[-28%] -mt-[72px] z-20 w-36 h-36 rounded-full overflow-hidden border-[6px] border-solid border-black"}>
                    <img
                        className={'w-full h-full object-cover'}
                        src={"https://th.bing.com/th/id/OIP.4hjKSvNoStamnhUXbI911wHaEo?&rs=1&pid=ImgDetMain"}
                        alt={"hero"}
                    />
                    <div
                        className={'w-10 h-10 absolute right-3 bottom-4 bg-black flex items-center justify-center rounded-full z-50 border-[2px] border-solid border-gray-50'}>
                        <GetIcon name={"camera"} className={'!w-6 !h-6'}/>
                    </div>
                </div>
                <div className={"w-full h-auto absolute left-0 -bottom-[100px] flex flex-col px-5"}>
                    <div>
                        <h3 className={'text-2xl text-default-800/60 font-ubuntu'}>Bapparaj sk</h3>
                        <p className={'font-bold font-robot text-default-800/90 tracking-widest'}>598 <span
                            className={'text-default-800/60 font-normal'}>friend</span></p>
                    </div>
                    <div className={'w-full h-auto flex mt-2 items-center gap-x-2 justify-start'}>
                        <Button color="primary" variant="bordered" className={'grow'}>
                            <GetIcon name={'plus'} className={'!w-5 !h-5'}/>
                            <span>Add to story</span>
                        </Button>
                        <Button color="default" variant="bordered" className={'grow'}>
                            <GetIcon name={'edit-pen'} className={'!w-5 !h-5'}/>
                            <span>Edit profile</span>
                        </Button>
                        <Button color="default" variant="bordered" className={'grow'}>
                            <GetIcon name={'setting'} className={'!h-5 !w-5'}/>
                        </Button>
                    </div>
                </div>
            </div>
            <div className={'w-full max-w-[1024px] h-[3px] bg-default-300 mt-[110px]'}/>
            <ProfileContains/>
        </main>
    );
};

export default Profile;
