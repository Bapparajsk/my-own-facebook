"use client"

import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { 
    Badge, Avatar, Image, Button, Modal, ModalContent, 
    ModalBody, ModalFooter, useDisclosure, Textarea, 
    Dropdown, DropdownTrigger, DropdownMenu, DropdownItem
} from "@nextui-org/react";
import { GetIcon } from "@/components/GetIcon";
import Comment from "@/components/Comment";
import { CommentType, PostProps } from "@/interface/component";
import Share from "@/components/Share";
import { useUserContext } from "@/context/UserProvider";
import { Ellipsis } from 'lucide-react';
import { DeleteDocumentBulkIcon, EditDocumentBulkIcon } from "@nextui-org/shared-icons";
import { formatNumber, getDate, postUpdate } from '@/utils/post';
import { PopupDetails } from '@/interface/post';
import { useMutation } from '@tanstack/react-query';
import { set } from 'react-hook-form';


const Post = forwardRef<HTMLDivElement, PostProps>(({
    idx,
    id,
    name,
    time,
    userImg,
    description,
    userActive,
    isImage,
    containUrl,
    likeCount,
    commentCount,
    shareCount,
    preview,
    comments
  }, ref) => {
    const [popupDetails, setPopupDetails] = useState<PopupDetails>({placement: 'bottom', height: 20, isComment: true});
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [notfound, setNotfound] = useState(false);
    const [postComments, setPostComments] = useState<CommentType[]>([]);
    const [commentMessage, setCommentMessage] = useState<string>('');
    const [postCommentsCount, setpostCommentsCount] = useState<number>(commentCount);
    const lastCommentRef = useRef<HTMLDivElement>(null);

    const handleClick = (data: PopupDetails) => {
        setPopupDetails(data);
        onOpen()
    }

    const commentMutation = useMutation({
        mutationFn: async () => {

            if (!userDetails) {
                return ;
            }

            setPostComments([...postComments, {
                id: userDetails._id,
                userId: userDetails._id,
                userName: userDetails.name,
                userImage: userDetails.profileImage?.profileImageURL || '/images/default-forground.png',
                createdAt: new Date(),
                modify: new Date(),
                comment: commentMessage,
            }]);

            setCommentMessage('');

            return postUpdate({event: 'comment', id}, {userId: userDetails._id, comment: commentMessage});
        },
        onSuccess(data) {
            setpostCommentsCount(postCommentsCount + 1);
            const { commentId } = data;
            if (!commentId) {
                return;
            }

            const comment = postComments.find((comment) => comment.id === userDetails?._id);

            if (!comment) {
                return;
            }

            postComments[postComments.length - 1].id = commentId;
            setPostComments(postComments);
        },
    })

    const { userDetails, setUserDetails } = useUserContext();
    const [postLike, setPostLike] = useState<number>(likeCount);

    const likePostMutation = useMutation({
        mutationFn: async () => {
            if (!userDetails) {
                return;
            }

            const event = userDetails.like[id] ? 'dislike' : 'like';
            
            if (event === "like") {
                const user = userDetails;
                if (!user) {
                    return ;
                }
                user.like[id] = id;
                setUserDetails(user);
                setPostLike(postLike + 1);
            } else if (event === "dislike") {
                const user = userDetails;
                if (!user) {
                    return ;
                }
                delete user.like[id];
                setUserDetails(user);
                setPostLike(postLike - 1);
            }

            return postUpdate({event, id}, {userId: userDetails._id});
        },
    });

    useEffect(() => {
        if (comments) {
            setPostComments(Object.values(comments));
        }

    }, [])

    useEffect(() => {
        if (lastCommentRef.current) {
            lastCommentRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [postComments])

    
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
                        isLoading={likePostMutation.isPending}
                        onClick={() => {
                            if (!userDetails) {
                                return;
                            }
                            likePostMutation.mutate();
                        }}
                    >
                        <GetIcon name={'like'} className={'!w-6'}/>
                        <span>{
                            formatNumber(postLike)
                        }</span>
                    </Button>
                    <Button
                        onPress={() => {
                            handleClick({placement: 'bottom', height: 20, isComment: true});
                        }}
                        color="primary"
                        variant="flat"
                        className={'grow'}
                    >
                        <GetIcon name={'comment'} className={'!w-6'}/>
                        <span>{formatNumber(postCommentsCount)}</span>
                    </Button>
                    <Button
                        onPress={() => handleClick({placement: 'center', height: 30, isComment: false})}
                        color="primary"
                        variant="flat"
                        className={'grow'}
                    >
                        <GetIcon name={'share'} className={'!w-6'}/>
                        <span>{formatNumber(shareCount)}</span>
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
                                {
                                    popupDetails.isComment ? (
                                        postComments.map((comment, idx) => {
                                            if (idx === postComments.length - 1) {
                                                return <Comment
                                                    key={idx}
                                                    {...comment}
                                                    ref={lastCommentRef}
                                                    _userId={userDetails?._id}
                                                />
                                            }
                                            return <Comment
                                                key={idx}
                                                {...comment}
                                                _userId={userDetails?._id}
                                            />
                                        })
                                            
                                    ) : (
                                        <Share/>
                                    )
                                }
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
                                        value={commentMessage}
                                        onValueChange={(value) => setCommentMessage(value)}
                                        endContent={
                                            <Button 
                                                color="primary" 
                                                onClick={() => commentMutation.mutate()} 
                                                isLoading={commentMutation.isPending}
                                                
                                            >
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
