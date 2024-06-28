import React, {useEffect, useMemo, useState} from 'react';
import Post from "@/components/Post";
import {useRouter} from "next/navigation";
import {useQueryClient} from "@tanstack/react-query";
import axios from "axios";
import {PostSType} from "@/interface/postType";
import { UserSType } from '@/interface/usertupe';

const UserPosts = ({userDetails} : {userDetails: UserSType}) => {

    const router = useRouter();
    const queryClient = useQueryClient();
    const [posts, setPosts] = useState<PostSType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllPost(userDetails.post);
    }, [userDetails]);

    const fetchPost = async (id: string): Promise<PostSType | null> => {
        const appToken = localStorage.getItem("app-token");
        if (appToken === null) {
            return null;
        }

        try {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/api/post/${id}`,
                {
                    headers: {
                        token: appToken,
                        containerType: 'application/json'
                    }
                }
            );
            return res.data.post as PostSType;
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    const getAllPost = async (posts: { postId: string }[]): Promise<void> => {
        setLoading(true);
        const postDate: PostSType[] = [];
        for (const item of posts) {
            const p = await fetchPost(item.postId);
            if (p !== null) {
                postDate.push(p);
            }
        }
        setPosts(postDate);
        setLoading(false);
    };

    return (
        <div className={'w-full h-auto'}>
            {loading ? (
                <p>Loading...</p>
            ) : (
                posts.map((item, idx) => {
                    console.log(item, "item")
                    return (<Post
                        id={item._id}
                        key={idx}
                        name={item.name}
                        time={item.createdAt}
                        userImg={item.imageUrl ? item.imageUrl : ""}
                        description={item.description}
                        userActive={true}
                        isImage={item.contentType !== "video/mp4"}
                        containUrl={item.contentUrl}
                        like={item.likeCount}
                        comment={item.commentCount}
                        share={item.shareCount}
                    />)
            })
            )}
        </div>
    );
};

export default UserPosts;
