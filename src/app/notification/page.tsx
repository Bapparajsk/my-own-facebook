"use client"

import Nav from "@/components/fried/Nav";
import React, {useEffect, useState} from 'react';
import FriendRequest from "@/components/fried/FriendRequest";
import Notifications from "@/components/notification";

export default function Notification() {
    const [isNavbarVisible, setNavbarVisible] = useState(true);

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
              <Notifications/>
          </div>
      </div>
  );
}
