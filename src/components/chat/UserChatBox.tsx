import React from 'react';
import ChatCard from './ChatCard';

const UserChatBox = () => {
    return (
        <div className={'w-fll h-full flex flex-col gap-y-4'}>
            <ChatCard
                imgSrc={"https://demotix.com/wp-content/uploads/2019/07/web-design5-1170x658.jpg"}
                name={"Chat"}
                lastMessage={'hello world'}
                isActive={true}
                id={'923jhdfb78644u'}
            />
            <ChatCard
                imgSrc={"https://www.sapphirewebsolutions.com/wp-content/uploads/2019/09/Web-Development-Trends.jpg"}
                name={"Susm ita"}
                lastMessage={'hello'}
                isActive={false}
                id={'923jhd564578644u'}
            />
            <ChatCard
                imgSrc={"https://1.bp.blogspot.com/-hmnGlsFdQSU/Xnrsm0iDU-I/AAAAAAAAa_Y/bm4VWsgpfmYU2s0AXM2Hxq6HGFnpHQm4gCLcBGAsYHQ/s1600/79966505_2837790296273430_7540898948747395082_n.jpg"}
                name={"bitoeylovely"}
                lastMessage={'hey what\'s up'}
                isActive={true}
                id={'923jhd5645478644u'}
            />
        </div>
    );
};

export default UserChatBox;
