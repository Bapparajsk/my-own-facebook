import React from 'react';
import UserCard from '@/components/chat/UserCard';
import { postData } from '@/app/teptData';

const UserActive = () => {
    return (
        <div className={'w-auto flex h-auto overflow-x-auto gap-x-4 scrollbar-hide'}>
            {
                postData.map((post, idx) => (
                    <UserCard
                        key={idx}
                        name={post.name}
                        imgSrc={post.userImg}
                        active={post.userActive}
                    />
                ))
            }
        </div>
    );
};

export default UserActive;
