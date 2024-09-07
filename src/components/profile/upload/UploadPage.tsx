"use client"

import React, { ChangeEvent, useEffect, useState } from 'react';
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
} from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import { UserSType } from '@/interface/usertupe';
import { FileImage, Video, X } from 'lucide-react';
import { LinkButton } from './LinkButton';
import Post from '@/components/Post';
import { useToasterContext } from "@/context/ToasterContext";
import { formatSize } from '@/lib/fetchPost';
import { useMutation } from "@tanstack/react-query"
import { postUpload } from '@/lib/PostFuctions';

export const UploadPage = ({ userDetails }: { userDetails: UserSType }) => {
    const [inputSrc, setInputSrc] = useState<{ value: string, type: "image" | "video" } | null>(null);
    const [file, setFile] = useState<any>(null);
    const [previewMood, setPreviewMood] = useState<boolean>(false);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [description, setDescription] = useState<string>("");
    const [fileSize, setFileSize] = useState<number | null>(null);


    const pram = useSearchParams();
    const env = pram.get("env");
    const [inputAccptType, setInputAccptType] = useState<"image" | "video" | string | null>(env);

    const { setNotyDetails } = useToasterContext();

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current?.click();
        }
    }, []);

    const fetchPost = useMutation({
        mutationFn: async () => {
            postUpload({ inputAccptType, inputSrc, file, description, userDetails });
        } ,
        onError: (e) => {
            setNotyDetails({ type: "error", contain: { message: "Failed to upload, try again later..." } })
        },
        onSuccess: () => {
            setNotyDetails({ type: "success", contain: { message: "Uploaded..." } });
            setInputSrc(null);
            setFile(null);
            setDescription("");
        }
    });

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        setFileSize(null);
        setFile(null)
        if (!file) {
            setInputSrc(null);
            return;
        }

        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e: ProgressEvent<FileReader>) => {
                if (e.target?.result) {
                    setInputSrc({ value: e.target.result as string, type: "image" });
                }
            };
            setFile(file);
            reader.readAsDataURL(file);
        } else if (file.type.startsWith('video/')) {
            console.log(file);

            const videoURL = URL.createObjectURL(file);
            setInputSrc({ value: videoURL, type: "video" });
            setFileSize(file.size);
            setFile(file);
        } else {
            setInputSrc(null);
            setFileSize(null);
            setFile(null)
        }
    };

    const cancel = () => {
        setInputSrc(null);
        setFile(null);
        setDescription("");
        setPreviewMood(false);
    }

    if (env !== null && env !== "image" && env !== "video") {
        return <div>Invalid Request</div>
    }

    return (
        <div className={'w-full h-full'}>
            <SettingNav isUnder />
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
                            >
                                Post
                            </Button>
                        </div>
                    </CardHeader>
                    <Divider />
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
                        {inputSrc === null && <div className={'w-[60%] h-auto flex flex-col justify-start items-center gap-y-3'}>
                            <LinkButton
                                name={"Photo"}
                                icon={<FileImage size={18} color="green" />}
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
                                icon={<Video size={18} color="red" />}
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
                    <Divider />
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