"use client"

import React, { forwardRef, useState } from 'react';
import { 
    Badge, Avatar, Image, Button, Modal, ModalContent, 
    ModalBody, ModalFooter, useDisclosure, Textarea, 
    Dropdown, DropdownTrigger, DropdownMenu, DropdownItem
} from "@nextui-org/react";
import { GetIcon } from "@/components/GetIcon";
import { Comment } from "@/components/Comment";
import { PostProps } from "@/interface/component";
import Share from "@/components/Share";
import { useUserContext } from "@/context/UserProvider";
import { Ellipsis } from 'lucide-react';
import { DeleteDocumentBulkIcon, EditDocumentBulkIcon } from "@nextui-org/shared-icons";
import { formatNumber, getDate } from '@/utils/post';
import { PopupDetails } from '@/interface/post';


const Post = forwardRef<HTMLDivElement, PostProps>(({
    id,
    name,
    time,
    userImg,
    description,
    userActive,
    isImage,
    containUrl,
    like,
    comment,
    share,
    preview
  }, ref) => {
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
            <div ref={ref} className={'w-full h-auto flex flex-col items-start justify-center gap-y-4 mb-5'}>
                <div className={'w-full h-full flex flex-col'}>
                    <div className={'w-full h-full flex gap-x-2 items-center justify-between'}>
                        <div className={"w-auto h-full flex gap-x-2 items-center justify-start"}>
                            <Badge disableAnimation={false} color={'success'} shape={'circle'} showOutline={false} placement={'bottom-right'} content={userActive && ""}>
                                <Image
                                    alt='user image'
                                    className='w-10 h-10 object-cover rounded-full'
                                    src={userImg || '/images/default-forground.png'}
                                />
                            </Badge>
                            <div className={'w-auto h-full flex flex-col items-start justify-center font-roboto-mono'}>
                                <p className={'font-bold tracking-[.8px] text-default-800/90'}>{name}</p>
                                <p className={'font-light text-default-500'}>{getDate(time)}</p>
                            </div>
                        </div>
                        <div>
                            <Dropdown>
                                <DropdownTrigger>
                                    <Button 
                                        color={"secondary"}
                                        variant={"flat"}
                                        isIconOnly
                                    >
                                        <Ellipsis />
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu aria-label="Static Actions">
                                    <DropdownItem key="edit">
                                        <div className={'w-full h-auto flex items-center justify-start gap-x-2'}>
                                            <EditDocumentBulkIcon/> 
                                            <span>Edit Post</span>
                                        </div>
                                    </DropdownItem>
                                    <DropdownItem key="share">
                                        <div className={'w-full h-auto flex items-center justify-start gap-x-2'}>
                                            <GetIcon name={'share'} className={'!w-4'}/> 
                                            <span> Share Post </span> 
                                        </div>
                                    </DropdownItem>
                                    <DropdownItem key="delete" className="text-danger" color="danger">
                                        <div className={'w-full h-auto flex items-center justify-start gap-x-2'}>
                                            <DeleteDocumentBulkIcon/> 
                                            <span>Delete Post</span>
                                        </div>
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    </div>
                    <div className={'w-3/4 h-full'}>
                        <pre className={`whitespace-pre-line font-plus-jakarta-ans ${preview && description.length === 0 && "text-default-500"}`}>
                            {description.length === 0 ? 'Say something about this post...' : description}
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
            {!preview && <hr className="border-none h-[1px] bg-default-300 mb-4"/>}
        </>
    );
});

export default Post;
