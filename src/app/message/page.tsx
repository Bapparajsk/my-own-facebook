"use client"

import React, { useEffect } from 'react';
import Nav from '@/components/chat/Nav'
import ChatContainer from '@/components/chat';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const Message = () => {

    useEffect(() => {
        console.log('Message Page');
        
    },[])
    

    return (
        <div className={'w-full h-auto'}>
            <Nav/>
            <div className={'w-full h-auto my-12 px-4'}><ChatContainer/></div>
        </div>
    );
};

export default Message;
