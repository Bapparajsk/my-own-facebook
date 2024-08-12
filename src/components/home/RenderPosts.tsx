"use client"

import { useEffect } from 'react';
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

    const post = data?.pages.flatMap((page) => page.data);

    return (
        <div className={'w-full h-auto mt-4'}>
            {
                post?.map((item, idx) => {                    
                    if (idx === post.length-1) {
                        return <Post
                            ref={ref}
                            key={idx}
                            isImage={item.contentType.startsWith('image') ? true : false}
                            {...item}
                        />
                    }
                    return (
                        <Post
                            key={idx}
                            isImage={item.contentType.startsWith('image') ? true : false}
                            {...item}
                        />
                    )
                })
            }
        </div>
    );
};

export default RenderPosts;
