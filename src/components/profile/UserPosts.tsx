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
                `${process.env.NEXT_PUBLIC_SERVER_URL}/api/post/user-post`,
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

        try {
            const appToken = localStorage.getItem("app-token");
            if (appToken === null) {
                throw new Error("Token not found");
            }

            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/api/post/user-post`,
                {
                    headers: {
                        token: appToken,
                        containerType: 'application/json'
                    }
                }
            );

            const { post } = res.data as { post: PostSType[] };
            setPosts(post);
        } catch (error) {
            console.log(error);
            setPosts([]);
        }
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
                        idx={idx}
                        id={item._id}
                        key={idx}
                        name={item.name}
                        time={item.createdAt}
                        userImg={userDetails.profileImage.profileImageURL || "/images/default-forground.png"}
                        description={item.description}
                        userActive={true}
                        isImage={item.contentType !== "video/mp4"}
                        containUrl={item.contentUrl}
                        likeCount={item.likeCount}
                        commentCount={item.commentCount}
                        shareCount={item.shareCount}
                    />)
            })
            )}
        </div>
    );
};

export default UserPosts;
