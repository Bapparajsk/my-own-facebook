"use client"

import React, {ChangeEvent, Fragment, useRef, useState} from "react";
import { ChevronLeft, Plus, Upload } from "lucide-react";
import { Card, Avatar, CardBody, CardHeader, Button, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { UserSType } from "@/interface/usertupe";
import { useMutation } from "@tanstack/react-query";
import {createImageUrl, updateProfileImage, uploadImageToS3} from "@/lib/credential";
import { useUserContext } from "@/context/UserProvider";
import { useToasterContext } from "@/context/ToasterContext";
import UseAnimations from "react-useanimations";
import arrowUp from "react-useanimations/lib/arrowUp"
import {AnimatedCheckIcon} from "@/components/AnimatedCheckIcon";

export const ProfilePicture = ({ user }: { user: UserSType }) => {
    const [trackUpload, setTrackUpload] = useState<"url" | "s3" | "upload" | undefined>(undefined);
    const [inputSrc, setInputSrc] = useState<string | undefined>(undefined);
    const [file, setFile] = useState<any>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const { setUserDetails } = useUserContext();
    const { setNotyDetails } = useToasterContext();

    const { mutate, isPending, isSuccess } = useMutation({
        mutationFn: async (fileData: any) => {
            setTrackUpload("url");
            const { url, accessToken } =  await createImageUrl(fileData.name, fileData.type);
            console.log("1")
            setTrackUpload("s3");
            await uploadImageToS3(url, file);
            console.log(2)
            setTrackUpload("upload");
            const { imageUrl } = await updateProfileImage(accessToken);
            console.log(3)
            setTrackUpload(undefined);
            return imageUrl;
        },
        onError(err) {
            setTrackUpload(undefined);
            setNotyDetails({ type: "error", contain: { message: err.message || "error" } });
            console.log(err);
        },
        onSuccess(imageUrl) {
            setTrackUpload(undefined);
            setUserDetails({ ...user, profileImage: { profileImageURL: imageUrl } });
            setNotyDetails({ type: "success", contain: { message: "Profile picture updated successfully" } });
            router.back();
        }
    })

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (!file || !file.type.startsWith('image/')) {
            return;
        }
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
            if (e.target?.result) {
                setInputSrc(e.target.result as string);
            }
        };
        setFile(file);
        reader.readAsDataURL(file);
    };

    return (
        <Card className="w-screen max-w-[500px] px-5 py-2 flex flex-col bg-transparent/50 backdrop-blur-[5px] duration-500">
            <CardHeader>
                <div className="w-full">
                    <div className="flex flex-col items-start justify-center gap-y-2">
                        <ChevronLeft onClick={() => router.back()} />
                        <span className={'text-xl'}>Profile picture</span>
                    </div>
                    <div className="flex flex-col items-center justify-center mt-10">
                        <Avatar
                            src={inputSrc || user.profileImage.profileImageURL || "/images/default-forground.png"}
                            className="w-40 h-40 text-large"
                        />
                    </div>
                </div>
            </CardHeader>
            <Input
                ref={inputRef}
                type={"file"}
                accept={`image/*`}
                className={"hidden"}
                onChange={handleFileChange}
            />
            <CardBody className={"gap-y-3"} >
                <Button
                    onPress={() => inputRef.current?.click()}
                    color={"primary"}
                    variant={'flat'}
                    className={'justify-start'}
                    disabled={ isPending || isSuccess }
                >
                    <Plus />
                    <span>{inputSrc ? "Change" : "Upload new"} Photo</span>
                </Button>
                <Button
                    onPress={() => mutate(file)}
                    color={"success"}
                    variant={'shadow'}
                    className={`${!inputSrc  && "hidden"}`}
                    isLoading={isPending}
                    disabled={isPending || isSuccess}
                >
                    { trackUpload === undefined ?
                        <Fragment>
                            <Upload/>
                            <span>Save Changes</span>
                        </Fragment> :
                        (
                            trackUpload === "url" || trackUpload === "s3" ?
                                (
                                    <>
                                        <UseAnimations animation={arrowUp} size={40} className={"text-white"} />
                                        <span> Loading...</span>
                                    </>
                                ) : (
                                    <AnimatedCheckIcon size={"md"} color={"#FFF"} />
                                )
                        )
                    }
                </Button>
            </CardBody>
        </Card>
    );
};
