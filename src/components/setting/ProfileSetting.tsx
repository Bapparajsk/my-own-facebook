"use client"

import React from "react";
import { CardHeader, Avatar, Card, CardBody } from "@nextui-org/react";
import { CircleUserRound, ShieldCheck, Cake, Image, NotebookText } from "lucide-react";
import { ProfileSettingButton } from "@/components/setting/ProfileSettingButton";
import { useUserContext } from "@/context/UserProvider";
import { useRouter } from "next/navigation";

export const ProfileSetting = () => {

    const { userDetails } = useUserContext();
    const router = useRouter();

    if (!userDetails) {
        router.replace('/');
        return null;
    }

    const ProfileSettingButtonData = [
        {
            name: 'Name',
            link: 'name',
            icon: <CircleUserRound />
        },
        {
            name: 'Role',
            link: 'role',
            icon: <NotebookText />
        },
        {
            name: 'Contact info',
            link: 'contact-information',
            icon: <ShieldCheck />
        },
        {
            name: 'Date of birth',
            link: 'birthday',
            icon: <Cake />
        },
        {
            name: 'Profile picture',
            link: 'profile-picture',
            icon: <Cake />
        }
    ]

    return (
        <Card className="w-[350px] max-w-[500px] px-5 flex flex-col gap-y-2 bg-transparent/50 backdrop-blur-[5px]">
            <CardHeader className={'flex flex-col items-center justify-center'}>
                <Avatar src={userDetails?.profileImage.profileImageURL || "/images/default-forground.png"} className="w-24 h-24 text-large" />
                <h3 className={'font-bold text-2xl'}>{userDetails?.name || "User"}</h3>
                <p className={'font-light text-sm'}>{userDetails?.role || ""}</p>
            </CardHeader>
            <CardBody className={'gap-y-2'}>
                {
                    ProfileSettingButtonData.map((data, index) => (
                        <ProfileSettingButton
                            key={index}
                            name={data.name}
                            link={data.link}
                            icon={data.icon}
                        />
                    ))
                }
            </CardBody>
        </Card>
    );
};
