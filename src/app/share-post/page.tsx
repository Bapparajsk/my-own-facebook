"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'next/navigation'; 
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Post from '@/components/Post';


export default function Page() {
    const searchParams = useSearchParams();
    const postId = searchParams.get('postId');

    const {data, status} = useQuery({
        queryKey: ['rendom-post'],
        queryFn: async () => {

            const url = process.env.NEXT_PUBLIC_SERVER_URL;

            if (!url) {
                throw new Error('No url found');
            }

            const res = await axios.get(
                `${url}/api/post/onepost?postid=${postId}`
            )

            // console.log(res.data);
            console.log(res.data.post);
            

            return res.data.post;
        }
    });

    return (
        <AnimatePresence mode='wait'>
            {!postId ? (
                <motion.div
                    key="not-found"
                    className='flex justify-center items-center h-screen'
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transformTemplate={({ x, ...rest }) => `translate3d(${x}%, 0, 0)`}
                    transition={{ duration: 0.5 }}
                    exit={{ opacity: 0, x: 50 }}
                >
                    <div>
                        <h1>Post ID not found</h1>
                    </div>
                </motion.div>
            ) : (
                <motion.div
                    key="found"
                    className='flex justify-center items-center h-screen'
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                >
                    {status === 'pending' ? (
                        <div>Loading...</div>
                    ) : status === 'error' ? (
                        <div>Error</div>
                    ) : (
                        <div className={"max-w-[650px] px-4"}> 
                            <Post
                                idx={0}
                                id={data._id}
                                name={data.name}
                                time={data.createdAt}
                                userImg={data.imageUrl}
                                description={data.description}
                                userActive={data.userActive}
                                isImage={data.contentType.startsWith('image') ? true : false}
                                containUrl={data.contentUrl}
                                likeCount={data.likeCount}
                                commentCount={0} 
                                shareCount={0}
                                comments={data.comments}
                            />
                        </div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
