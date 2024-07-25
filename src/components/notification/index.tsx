import React, { useState } from 'react';
import NotifyCard from '@/components/notification/NotifyCard';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const Notifications = () => {

    const [not, setNot] = useState([]);

    const { isPending } = useQuery({
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
            console.log(res.data);
            setNot(res.data.notification);
            return res.data.notification;
        },
        retry: 2
    });

    return (
        <div className={'w-full h-full flex flex-col gap-y-2'}>
            {isPending ? <div>Loading...</div> : (
                not.slice().reverse().map((n: any, idx) => (
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
                    />
                ))
            )}
        </div>
    );
};

export default Notifications;
