"use client"

import React, { useState } from 'react';
import {Badge, Avatar, Image, Button, Modal, ModalContent, ModalBody, ModalFooter, useDisclosure, Textarea} from "@nextui-org/react";
import {GetIcon} from "@/components/GetIcon";
import {Comment} from "@/components/Comment";
import {PostProps} from "@/interface/component";
import Share from "@/components/Share";
import { useUserContext } from "@/context/UserProvider";


function formatNumber(num: number): string {
    if (num >= 1e9) {
        return (num / 1e9).toFixed(2) + 'B';
    } else if (num >= 1e6) {
        return (num / 1e6).toFixed(2) + 'M';
    } else if (num >= 1e3) {
        return (num / 1e3).toFixed(2) + 'K';
    } else {
        return num.toString();
    }
}

interface PopupDetails {
    placement: "bottom" | "center" | undefined
    height: number
    isComment: boolean
}

const Post = ({id, name, time, userImg, description, userActive, isImage, containUrl, like, comment, share, preview}: PostProps) => {
    const [popupDetails, setPopupDetails] = useState<PopupDetails>({placement: 'bottom', height: 20, isComment: true});
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [notfound, setNotfound] = useState(false);

    const handleClick = (data: PopupDetails) => {
        setPopupDetails(data);
        onOpen()
    }

    const { userDetails } = useUserContext();
    
    return (
        <>
            <div className={'w-full h-auto flex flex-col items-start justify-center gap-y-4 mb-5'}>
                <div className={'w-auto h-full flex flex-col'}>
                    <div className={'w-auto h-full flex gap-x-2 items-center justify-start'}>
                        <Badge disableAnimation={false} color={'success'} shape={'circle'} showOutline={false} placement={'bottom-right'} content={userActive && ""}>
                            <Avatar
                                radius="md"
                                src={userImg}
                            />
                        </Badge>
                        <div className={'w-auto h-full flex flex-col items-start justify-center font-roboto-mono'}>
                            <p className={'font-bold tracking-[.8px] text-default-800/90'}>{name}</p>
                            {/*<p className={'font-light text-default-500'}>{time.getDay()}</p>*/}
                        </div>
                    </div>
                    <div className={'w-3/4 h-full'}>
                        <pre className={'whitespace-pre-line font-plus-jakarta-ans'}>
                            {description}
                        </pre>
                    </div>
                </div>
                <div>
                    {isImage ? (
                        <Image
                            loading={'lazy'}
                            className={'w-screen h-auto object-cover'}
                            alt="NextUI hero Image with delay"
                            src={notfound ? '/notfound.jpg' : containUrl}
                            onError={() => {
                                setNotfound(true);
                            }}
                        />
                    ) : (
                        <video className={'w-screen h-full object-cover'} controls preload={'https://th.bing.com/th/id/OIP.yQ5dqe9e_mtXsEk9EHo5IwHaKX?w=182&h=254&c=7&r=0&o=5&dpr=1.3&pid=1.7'}>
                            <source src={containUrl} type="video/mp4" />
                            <track
                                src="/path/to/captions.vtt"
                                kind="subtitles"
                                srcLang="en"
                                label="English"
                            />
                            Your browser does not support the video tag.
                        </video>
                    )}
                </div>
                <div className={'w-full h-auto flex items-center justify-center gap-x-2'}>
                    <Button 
                        color="primary"  
                        variant={userDetails && userDetails.like[id] ? "shadow" : "flat"} 
                        className={'grow'}
                        disabled={userDetails && userDetails.like[id] ? true : false}
                    >
                        <GetIcon name={'like'} className={'!w-6'}/>
                        <span>{formatNumber(like)}</span>
                    </Button>
                    <Button
                        onPress={() => handleClick({placement: 'bottom', height: 20, isComment: true})}
                        color="primary"
                        variant="flat"
                        className={'grow'}
                    >
                        <GetIcon name={'comment'} className={'!w-6'}/>
                        <span>{formatNumber(comment)}</span>
                    </Button>
                    <Button
                        onPress={() => handleClick({placement: 'center', height: 30, isComment: false})}
                        color="primary"
                        variant="flat"
                        className={'grow'}
                    >
                        <GetIcon name={'share'} className={'!w-6'}/>
                        <span>{formatNumber(share)}</span>
                    </Button>
                </div>
            </div>
            {!preview && <Modal
                isOpen={isOpen}
                placement={popupDetails.placement!}
                onOpenChange={onOpenChange}
                backdrop={'blur'}
                hideCloseButton={true}
                style={{ height: `calc(100vh - ${popupDetails.height}%)`}}
                scrollBehavior={'inside'}
                radius={'sm'}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalBody className={'mt-2'}>
                                <Comment
                                    key={2}
                                    name={'Sohey khatun'}
                                    comment={'hello bappa a kis ki photo hey'}
                                    profileImageUrl={'https://th.bing.com/th/id/OIP.TXJ-iZJ33GINbidIe2rg9AAAAA?rs=1&pid=ImgDetMain'}
                                />
                                <Comment
                                    key={2}
                                    name={'Susmita aktar'}
                                    comment={'Can you write the installation steps? Each details pls. I want to this make myself'}
                                    profileImageUrl={'https://i.pinimg.com/originals/bb/c3/8f/bbc38f08f0347efb0b29edb119d3c18f.jpg'}
                                />
                                <Share/>
                            </ModalBody>
                            {popupDetails.isComment && <ModalFooter>
                                <div className="flex w-full gap-x-2">
                                    <Avatar
                                        radius="full"
                                        src={userImg}
                                    />
                                    <Textarea
                                        label="Comment"
                                        placeholder="Write a comment..."
                                        radius={'md'}
                                        minRows={1}
                                        endContent={
                                            <Button color="primary" onPress={onClose}>
                                                Action
                                            </Button>
                                        }
                                    />
                                </div>
                            </ModalFooter>}
                        </>
                    )}
                </ModalContent>
            </Modal>}
            <hr className="border-none h-[1px] bg-default-300 mb-4"/>
        </>
    );
};

export default Post;
