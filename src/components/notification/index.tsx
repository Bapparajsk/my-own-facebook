import React, { useState } from 'react';
import NotifyCard, { NotificationProps } from '@/components/notification/NotifyCard';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const Notifications = () => {

    const [not, setNot] = useState([]);

    const { isPending, data } = useQuery({
        queryKey: ["notifications"],
        queryFn: async () => {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/notification`,
                {
                    headers: {
                        token: localStorage.getItem('app-token')!
                    }
                }
            )
            return res.data.notification as NotificationProps[];
        },
        retry: 2
    });

    return (
        <div className={'w-full h-full flex flex-col gap-y-2'}>
            {isPending ? <div>Loading...</div> : (
                data?.reverse().map((n: any, idx: any) => (
                    <NotifyCard
                        key={idx}
                        idx={idx}
                        Type={n.Type}
                        createdAt={n.createdAt}
                        description={n.description}
                        image={n.image}
                        isvew={false}
                        name={n.name}
                        userId={n.userId}
                        link={n.link}
                    />
                ))
            )}
        </div>
    );
};

export default Notifications;
