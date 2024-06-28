import React from 'react';
import {postData} from '@/app/teptData'
import Post from "@/components/Post";

const RenderPosts = () => {
    return (
        <div className={'w-full h-auto mt-4'}>
            {
                // postData.map((post, idx) => {
                //     const containUrl= post.isImage ? post.imgSrc : post.videoSrc;
                //     // console.log("containUrl", containUrl);
                //     // // console.log(post)
                //     return <Post
                //         key={idx}
                //         name={post.name}
                //         time={post.time}
                //         userImg={post.userImg}
                //         description={post.description}
                //         userActive={post.userActive}
                //         isImage={post.isImage}
                //         containUrl={containUrl}
                //         like={post.like}
                //         comment={post.comment} share={post.share}
                //     />
                // })
            }
        </div>
    );
};

export default RenderPosts;
