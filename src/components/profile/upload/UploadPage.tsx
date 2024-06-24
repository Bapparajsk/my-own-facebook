"use client"

import React, {ChangeEvent, useEffect, useState} from 'react';
import SettingNav from "@/components/setting/SettingNav";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Divider,
    Image,
    Button,
    Input,
    Textarea
} from "@nextui-org/react";

import {useSearchParams} from "next/navigation";
import { UserSType } from '@/interface/usertupe';
import { CaseSensitive, FileImage, Video } from 'lucide-react';
import { LinkButton } from './LinkButton';
import Post from '@/components/Post';

export const UploadPage = ({userDetails} : {userDetails: UserSType}) => {

    const [inputSrc, setInoutSrc] = useState<{value: string, type: "image" | "video"} | null>(null);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [discript, setDiscript] = useState<string>("")

    const pram = useSearchParams();
    const env = pram.get("env");

    if (env !== null && env !== "image" && env !== "video" && env !== "text") {
        return <div>Invalid Request</div>
    }

    const [inputAccptType, setInputAccptType] = useState<"image" | "video" | "text" | null>(env);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
    
        if (!file) {
            setInoutSrc(null);
            return;
        }

        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e: ProgressEvent<FileReader>) => {
                if (e.target?.result) {
                    setInoutSrc({value: e.target.result as string, type: "image"});
                }
            };
            reader.readAsDataURL(file);
        } else if (file.type.startsWith('video/')) {
            const videoURL = URL.createObjectURL(file);
            setInoutSrc({value: videoURL, type: "video"});
        } else {
            setInoutSrc(null);
        }
    };

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current?.click();
        }
    },[]);


    useEffect(() => {
        console.log(inputAccptType);
        
        if (inputAccptType === "image" || inputAccptType === "video") {
            inputRef.current?.click();
        }
    }, [inputAccptType])
    

    return (
        <div className={'w-full h-full'}>
            <SettingNav isUnder/>
            <div className={'w-full h-full flex justify-center'}>
                <Card className="w-full max-w-[400px]">
                    <CardHeader className="flex gap-3 flex-row justify-between">
                        <div className={"flex items-center gap-x-3"}>
                            <Image
                                alt="nextui logo"
                                height={40}
                                radius="sm"
                                src={userDetails.profileImage.profileImageURL || "https://avatars.githubusercontent.com/u/86160567?s=200&v=4"}
                                width={40}
                            />
                            <div className="flex flex-col">
                                <p className="text-md">{userDetails.name}</p>
                                <p className="text-small text-default-500">{userDetails.role}</p>
                            </div>
                        </div>
                        <div>
                            <Button
                                color={'success'}
                                variant={'shadow'}
                                // size={'small'}
                            >
                                Post
                            </Button>
                        </div>
                    </CardHeader>
                    <Divider/>
                    <CardBody className={'gap-y-2'}>
                        <div className={'w-full h-auto'}>
                            <Textarea
                                // ref={descriptRef}
                                variant="bordered"
                                labelPlacement="outside"
                                placeholder={inputAccptType === "text" || inputAccptType === null ? "Enter your description" : `Say something about this ${inputAccptType}...`}
                                className="w-full"
                                onChange={(e) => setDiscript(e.target.value)}
                            />
                        </div>
                        <input 
                            ref={inputRef} 
                            id={'containt-input'} 
                            type={"file"} 
                            accept={`${inputAccptType}/*`} 
                            className={"hidden"}
                            onChange={handleFileChange}
                        />
                        {inputSrc && (
                            
                            <Post
                                id='sdfhsd'
                                name={userDetails.name}
                                time={new Date()}
                                userImg='https://avatars.githubusercontent.com/u/86160567?s=200&v=4'
                                description={discript}
                                userActive={true}
                                isImage={inputSrc.type === "image"}
                                containUrl={inputSrc.value}
                                like={0}
                                comment={0}
                                share={0}
                                preview={true}
                            />
                            
                        )}
                        { inputSrc === null && <div className={'w-[60%] h-auto flex flex-col justify-start items-center gap-y-3'}>
                            <LinkButton
                                name={"Photo"}
                                icon={<FileImage size={18} color="green"/>}
                                onClick={() => {
                                    if (inputAccptType === "image") {
                                        inputRef.current?.click();
                                    }
                                    setInputAccptType("image");
                                }}
                            />
                            <LinkButton
                                name={"Video"}
                                icon={<Video size={18} color="red"/>}
                                onClick={() => {
                                    if (inputAccptType === "video") {
                                        inputRef.current?.click();
                                    }
                                    setInputAccptType("video");
                                }}
                            />
                            <LinkButton
                                name={"Text"}
                                icon={<CaseSensitive size={18} color="blue"/>}
                                onClick={() => setInputAccptType("text")}
                            />
                        </div>}
                    </CardBody> 
                    {/* <Divider/> */}
                    <CardFooter>
                        <Button
                            color={'danger'}
                            variant={'shadow'}
                            // size={'small'}
                            fullWidth
                        >
                            Cancel
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}