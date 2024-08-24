"use client"

import { useEffect, useState } from 'react';
import { useInfiniteQuery } from "@tanstack/react-query";
import { useIntersection } from '@mantine/hooks';
import Post from '../Post';
import { fetchPost } from '@/utils/post';

const RenderPosts = () => {

    const {
        data,
        fetchNextPage,
      } = useInfiniteQuery({
        queryKey: ['projects'],
        queryFn: fetchPost,
        getNextPageParam: (lastPage, pages) => lastPage.page,
        initialPageParam: 0
    });

    const { ref, entry } = useIntersection({
        root: null,
        threshold: 0.5
    })


    useEffect(() => {
        if (entry?.isIntersecting) {  
            fetchNextPage();
        }
    }, [entry]);


    // how to this post veriabal update in oanather component
    let post = data?.pages.flatMap((page) => page.data);

    return (
        <div className={'w-full h-auto mt-4'}>
            {
                post?.map((item, idx) => {                         
                    if (post && idx === post.length-2) {
                        return <Post
                            ref={ref}
                            key={idx}
                            idx={idx}
                            id={item._id}
                            name={item.name}
                            time={item.createdAt}
                            userImg={item.imageUrl}
                            description={item.description}
                            userActive={item.userActive}
                            isImage={item.contentType.startsWith('image') ? true : false}
                            containUrl={item.contentUrl}
                            likeCount={item.likeCount}
                            commentCount={item.commentCount} 
                            shareCount={item.shareCount}
                            comments={item.comments}
                        />
                    }
                    return (
                        <Post
                            idx={idx}
                            key={idx}
                            id={item._id}
                            name={item.name}
                            time={item.createdAt}
                            userImg={item.imageUrl}
                            description={item.description}
                            userActive={item.userActive}
                            isImage={item.contentType.startsWith('image') ? true : false}
                            containUrl={item.contentUrl}
                            likeCount={item.likeCount}
                            commentCount={item.commentCount} 
                            shareCount={item.shareCount}
                            comments={item.comments}
                        />
                    )
                })
            }
        </div>
    );
};

export default RenderPosts;
