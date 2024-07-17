"use client"

import Nav from "@/components/fried/Nav";
import React, {useEffect, useState} from 'react';
import Notifications from "@/components/notification";
import { useQuery } from "@tanstack/react-query";
import { useUserContext } from "@/context/UserProvider";

export default function Notification() {
    const [isNavbarVisible, setNavbarVisible] = useState(true);
    const [] = useState([]);
    const { userDetails, fetchUser } = useUserContext();

    // const { isLoading, error, data, status } = useQuery({
    //     queryKey: ["notifications"],
    //     queryFn: fetchUser,
    //     retry: 3,
    //     enabled: userDetails === undefined
    // });

    useEffect(() => {

        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY <= 100) {
                setNavbarVisible(false);
                return;
            }
            setNavbarVisible(currentScrollY < lastScrollY);
            lastScrollY = currentScrollY <= 0 ? 0 : currentScrollY;
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);

    }, []);

  return (
      <div className={'w-full h-auto flex flex-col gap-4'}>
          <Nav isNavbarVisible={isNavbarVisible}/>
          <div className={'flex flex-col gap-4 px-4 mt-10 mb-4'}>
            {
                // isLoading ? <div>Loading...</div> :
                <Notifications/>
            }
          </div>
      </div>
  );
}
