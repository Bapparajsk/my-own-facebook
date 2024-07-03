"use client"

import React, { useEffect, useRef, useState } from 'react';
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from 'axios';
import { useIntersection } from '@mantine/hooks';
import Post from '../Post';

const RenderPosts = () => {

    const fetchPost = async ({pageParam = 0}: {pageParam: number}) => {
        console.log('pageParam', pageParam);
        
        const res = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/post?page=${pageParam}`,
            {
                headers: {
                    token: localStorage.getItem('app-token')
                }
            }
        )        
        return res.data;
    }

    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
      } = useInfiniteQuery({
        queryKey: ['projects'],
        queryFn: fetchPost,
        getNextPageParam: (lastPage, pages) => lastPage.page,
        initialPageParam: 0
    });
    
    const lastPostRef = useRef<HTMLElement>(null);

    const { ref, entry } = useIntersection({
        root: null,
        threshold: 0.5
    })


    useEffect(() => {

        console.log('entry', entry?.isIntersecting);
        
        if (entry?.isIntersecting) {  
            console.log("dfjdfghdjfghui");
            
            fetchNextPage();
        }
    }, [entry]);

    const post = data?.pages.flatMap((page) => page.data);

    return (
        <div className={'w-full h-auto mt-4'}>
            {
                post?.map((item, idx) => {                    
                    if (idx === post.length-1) {
                        return <Post
                            ref={ref}
                            key={idx}
                            id={item._id}
                            name={item.name}
                            time={item.createdAt}
                            userImg={item.imageUrl}
                            description={item.description}
                            userActive={item.userActive}
                            isImage={item.contentType.startsWith('image') ? true : false}
                            containUrl={item.contentUrl}
                            like={0}
                            comment={0} 
                            share={0}
                        />
                    }
                    return (
                        <Post
                            key={idx}
                            id={item._id}
                            name={item.name}
                            time={item.createdAt}
                            userImg={item.imageUrl}
                            description={item.description}
                            userActive={item.userActive}
                            isImage={item.contentType.startsWith('image') ? true : false}
                            containUrl={item.contentUrl}
                            like={0}
                            comment={0} 
                            share={0}
                        />
                    )
                })
            }
        </div>
    );
};

export default RenderPosts;
