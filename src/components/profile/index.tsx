import React from 'react';
import {Card, CardBody, CardFooter, Image, Avatar, Button, Divider} from "@nextui-org/react";
import Link from "next/link";
import {GetIcon} from "@/components/GetIcon";
import UserPosts from "@/components/profile/UserPosts";

const ProfileContains = () => {
    const list = [
        {
            name: "Orange",
            img: "https://th.bing.com/th/id/OIP.GPgOs_sd9nF8fsKDOJe9dQHaEo?rs=1&pid=ImgDetMain",
        },
        {
            name: "Tangerine",
            img: "https://photutorial.com/wp-content/uploads/2023/04/Featured-image-AI-image-generators-by-Midjourney.png",
        },
        {
            name: "Raspberry",
            img: "https://imgv3.fotor.com/images/gallery/cartoon-character-generated-by-Fotor-ai-art-creator.jpg",
        },
        {
            name: "Lemon",
            img: "https://th.bing.com/th/id/R.99ddcbf758750602741c102135751487?rik=qlnKJsMqD8Vwsw&riu=http%3a%2f%2fwww.satsignal.eu%2fwxsat%2fMeteosat7-full-scan.jpg&ehk=Z0wiugYaRQo2%2bf7vnImocMDIfzFrNi8r1OIOLbAooFQ%3d&risl=1&pid=ImgRaw&r=0",
        },
        {
            name: "Avocado",
            img: "https://th.bing.com/th/id/OIP.nEyqgW4CwSIKYVRgWdAWUQHaE7?rs=1&pid=ImgDetMain",
        },
        {
            name: "Lemon 2",
            img: "https://1stwebdesigner.com/wp-content/uploads/2019/07/css-background-effects-thumb.jpg",
        },
    ];
    return (
        <div className={'w-full max-w-[1024px] h-full mt-5 px-5 flex flex-col gap-y-3'}>
            <div className="relative gap-5 grid grid-cols-3 pt-8">
                <p className={'absolute font-bold font-robot text-default-800/90 tracking-widest'}>598 <span
                    className={'text-default-800/60 font-normal'}>friend</span></p>
                <Link href={'/friend'} className={'absolute right-0 text-blue-500'}>see All</Link>
                {list.map((item, index) => (
                    <Card shadow="sm" key={index} className={'h-auto'} isPressable
                          onPress={() => console.log("item pressed")}>
                        <CardBody className="overflow-visible p-0">
                            <Image
                                shadow="sm"
                                radius="lg"
                                width="100%"
                                alt={item.name}
                                className="w-full object-cover h-[100px]"
                                src={item.img}
                            />
                        </CardBody>
                        <CardFooter className="text-small justify-between">
                            <b>{item.name}</b>
                        </CardFooter>
                    </Card>
                ))}
            </div>
            <hr className="border-none h-[1px] bg-default-300 text-red-800"/>
            <div className={'w-full h-full flex flex-col gap-y-4'}>
                <div className={'w-full h-auto'}>
                    <p className={'font-bold font-ubuntu tracking-widest'}>Posts</p>
                </div>
                <div className={'w-full h-auto flex items-center gap-x-2 justify-start'}>
                    <Avatar className={'cursor-pointer'} src={'https://i.pravatar.cc/150?u=a042581f4e29026024d'}/>
                    <Button className={'grow justify-start font-robot text-medium'}>Post a status update</Button>
                    <div className={'flex items-center gap-x-2 justify-end'}>
                        <GetIcon name={"image-upload"}/>
                    </div>
                </div>
                <div className="flex h-5 items-center justify-center space-x-4 text-small">
                    <div className={'flex items-center gap-x-2 justify-end'}>
                        <GetIcon name={"image-upload"} className={'text-green-500'} />
                        Photo
                    </div>
                    <Divider orientation="vertical"/>
                    <div className={'flex items-center gap-x-2 justify-end'}>
                        <GetIcon name={"video"} className={'text-red-500'} />
                        Video
                    </div>
                    <Divider orientation="vertical"/>
                    <div className={'flex items-center gap-x-2 justify-end'}>
                        <GetIcon name={"text-file"} className={'text-blue-500'} />
                        Text
                    </div>
                </div>
            </div>
            <hr className="border-none h-[1px] bg-default-300 text-red-800"/>
            <UserPosts/>
        </div>
    );
};

export default ProfileContains;
