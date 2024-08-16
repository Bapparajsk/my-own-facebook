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
    Textarea,
    Spinner
} from "@nextui-org/react";
import { useSearchParams, useRouter } from "next/navigation";
import { UserSType } from '@/interface/usertupe';
import { FileImage, Video, X } from 'lucide-react';
import { LinkButton } from './LinkButton';
import Post from '@/components/Post';
import { useToasterContext } from "@/context/ToasterContext";
import { formatSize } from '@/lib/fetchPost';
import axios from 'axios';
import { useMutation } from "@tanstack/react-query"

export const UploadPage = ({userDetails} : {userDetails: UserSType}) => {
    const [inputSrc, setInoutSrc] = useState<{value: string, type: "image" | "video"} | null>(null);
    const [file, setFile] = useState<any>(null);
    const [previewMood, setPreviewMood] = useState<boolean>(false);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [description, setDescription] = useState<string>("");
    const [fileSize, setFileSize] = useState<number | null>(null);

    const pram = useSearchParams();
    const env = pram.get("env");
    const router = useRouter();


    if (env !== null && env !== "image" && env !== "video") {
        return <div>Invalid Request</div>
    }

    const [inputAccptType, setInputAccptType] = useState<"image" | "video" | null>(env);
    

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        setFileSize(null);
        setFile(null)
        if (!file) {
            setInoutSrc(null);
            return;
        }

        console.log("file", file);
        

        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e: ProgressEvent<FileReader>) => {
                if (e.target?.result) {
                    setInoutSrc({value: e.target.result as string, type: "image"});
                }
            };
            setFile(file);
            reader.readAsDataURL(file);
        } else if (file.type.startsWith('video/')) {
            console.log(file);
            
            const videoURL = URL.createObjectURL(file);
            setInoutSrc({value: videoURL, type: "video"});
            setFileSize(file.size);
            setFile(file);
        } else {
            setInoutSrc(null);
            setFileSize(null);
            setFile(null)
        }
    };

    const { setNotyDetails } = useToasterContext();

    const postUpload = async () => {        
        if ((inputAccptType === "image" || inputAccptType === "video") && (inputSrc === null || file === null)) {
            setNotyDetails({
                type: "error",
                contain: {
                    message: "Please select a file to upload..."
                }
            });
            throw new Error("Please select a file to upload...");
        }

        try {

            const app_Token = localStorage.getItem('app-token');

            if (app_Token === null) {
                throw new Error("Token not found");
                router.replace('/sign-up');
            }

            if(!file.name || !file.type) {
                throw new Error("File name or type not found");
            }

            const body = {
                fileName: file.name,
                contentType: file.type,
                userName: userDetails.name,
            }

            const headers = {
                token: app_Token,
                containerType: 'application/json'
            }

            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/api/post/create-url`,
                body,
                {headers}
            );

            const { url, accessToken } = res.data;
            
            await axios.put(
                url,
                file,
                {
                    headers: {
                        'Content-Type': 'application/octet-stream'
                    }
                }
            );
            
            await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/api/post/add-post`,
                {
                    accessToken: accessToken,
                    description: description,
                },
                {headers}
            );

        } catch (error) {
            console.log(error);
            throw new Error("Failed to upload try again later...");
        }
    };

    const fetchPost = useMutation({
        mutationFn: postUpload,
        onMutate: () => {
            setNotyDetails({
                type: "default",
                startIcon: <Spinner size={"sm"}/>,
                contain: {
                    message: "Uploading..."
                }
            })
        },

        onError: (e) => {
            console.log("mmmm", e.message);
            
            setNotyDetails({
                type: "error",
                contain: {
                    message: "Failed to upload, try again later..."
                }
            })
        },

        onSuccess: () => {
            setNotyDetails({
                type: "success",
                contain: {
                    message: "Uploaded..."
                }
            });

            setInoutSrc(null);
            setFile(null);
            setDescription("");
            
        }
    });

    const cancel = () => {
        setInoutSrc(null);
        setFile(null);
        setDescription("");
        setPreviewMood(false);
    }

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
                                radius={"sm"}
                                src={userDetails.profileImage.profileImageURL || "/images/default-forground.png"}
                                width={40}
                            />
                            <div className="flex flex-col">
                                <p className="text-md">{userDetails.name}</p>
                                <p className="text-small text-default-500">{userDetails.role}</p>
                            </div>
                        </div>
                        <div className={'w-auto h-auto flex gap-x-2'}>
                            <Button
                                color={"warning"}
                                variant={previewMood ? 'shadow' : 'flat'}
                                onClick={() => file && setPreviewMood(!previewMood)}
                            >
                                Preview
                            </Button>
                            <Button
                                color={'success'}
                                variant={'shadow'}
                                onClick={() => fetchPost.mutate()}
                                isLoading={fetchPost.isPending}
                                // isDisabled={fetchPost.isSuccess}
                            >
                                Post
                            </Button>
                        </div>
                    </CardHeader>
                    <Divider/>
                    <CardBody className={'gap-y-2'}>
                        {file && <div className={'w-full h-auto'}>
                            <Textarea
                                variant="bordered"
                                labelPlacement="outside"
                                placeholder={`Say something about this ${inputAccptType}...`}
                                className="w-full tracking-widest"
                                onChange={(e) => setDescription(e.target.value)}
                                value={description === "" ? `` : description}
                            />
                        </div>}
                        <Input 
                            ref={inputRef} 
                            id={'containt-input'} 
                            type={"file"} 
                            accept={`${inputAccptType}/*`} 
                            className={"hidden"}
                            onChange={handleFileChange}
                        />
                        {inputSrc && (
                            previewMood && (
                                <Post
                                    idx={0}
                                    id='sdfhsd'
                                    name={userDetails.name}
                                    time={new Date()}
                                    userImg={userDetails.profileImage?.profileImageURL || "/images/default-forground.png"}
                                    description={description}
                                    userActive={true}
                                    isImage={inputSrc.type === "image"}
                                    containUrl={inputSrc.value}
                                    likeCount={0}
                                    commentCount={0}
                                    shareCount={0}
                                    preview={true}
                                />
                            ) || (
                                <div className={'relative w-full h-auto'}>
                                    {inputSrc.type === "image" ? (
                                        <Image
                                            alt="nextui logo"
                                            src={inputSrc.value}
                                            width={'100%'}
                                            height={'auto'}
                                            radius="sm"
                                        />
                                    ) : (
                                        <video
                                            width={'100%'}
                                            height={'auto'}
                                            src={inputSrc.value}
                                        />
                                    )}

                                    <Button 
                                        isIconOnly={fileSize === null ? true : false}
                                        radius='full'
                                        variant={"shadow"} 
                                        className={"absolute right-1 top-1 z-10"} 
                                        color={"warning"}
                                        onClick={cancel}
                                    >
                                        <X />
                                        {fileSize && formatSize(fileSize)}
                                    </Button>                                    
                                </div>
                            )
                        )}
                        { inputSrc === null && <div className={'w-[60%] h-auto flex flex-col justify-start items-center gap-y-3'}>
                            <LinkButton
                                name={"Photo"}
                                icon={<FileImage size={18} color="green"/>}
                                onClick={() => {
                                    if (inputAccptType === "image") {
                                        inputRef.current?.click();
                                        return;
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
                                        return;
                                    }
                                    setInputAccptType("video");
                                }}
                            />
                        </div>}
                    </CardBody> 
                    <Divider/>
                    {inputSrc && 
                        <CardFooter className={'gap-x-2'}>
                            <Button
                                color={'success'}
                                variant={'shadow'}
                                fullWidth
                                className={'grow'}
                                onClick={() => file && fetchPost.mutate()}
                            >
                                Post
                            </Button>
                            <Button
                                color={'danger'}
                                variant={'shadow'}
                                onClick={cancel}
                            >
                                Cancel
                            </Button>
                        </CardFooter>
                    }
                </Card>
            </div>
        </div>
    )
}