"use client"

import React, {useRef, useEffect} from 'react';
import {Email} from "@/components/verify/Email";
import {Password} from "@/components/verify/Password";

const Verify = () => {

    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.disablePictureInPicture = true;
        }
    }, []);

    return (
        <div className="w-full h-[100vh] flex items-center justify-center relative">
            <div className="absolute inset-x-0 -z-10 flex items-center justify-center h-full w-full">
                <video
                    ref={videoRef}
                    controlsList="nodownload noremoteplayback"
                    className={'w-screen h-screen object-cover'}
                    autoPlay
                    loop
                >
                    <source  src={'http://localhost:3000/video/verifybg.mp4'} type="video/mp4" />
                </video>
            </div>
            <div className={'border-3 border-green-200 rounded-2xl w-auto h-auto bg-transparent'}>
                <Email/>
            </div>

        </div>
    );
};

export default Verify;
