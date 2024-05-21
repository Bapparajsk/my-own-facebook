import React from 'react';
import {User, Button} from "@nextui-org/react";
import Link from "next/link";
import {Heart, MessageSquareText, Forward} from "lucide-react";

const Reel = ({videoSrc, videoRef}: {videoSrc: string, videoRef: React.RefObject<HTMLVideoElement>}) => {

    const handleVideo = () => {
        if (videoRef.current) {
            if (videoRef.current.paused) {
                videoRef.current.play().catch(r => console.log(r));
            } else {
                videoRef.current.pause();
            }
        }
    };

    return (
        <div className={'w-screen h-screen object-cover relative'}>
            <video
                className={'w-full h-full'}
                ref={videoRef}
                src={videoSrc}
                autoPlay
                loop
                onClick={handleVideo}
            >
                video are not support
            </video>
            <div className={'absolute bottom-2 w-full h-auto flex flex-col gap-y-3 justify-start px-6'}>
                <div className={'w-full h-full flex items-center gap-x-3'}>
                    <User
                        name={'Bapparaj sk'}
                        description={(
                            <Link href={`/user/Profile?username=bapparajsk`} className={'text-blue-400'}>
                                @bapparajsk
                            </Link>
                        )}
                        avatarProps={{
                            src: "https://avatars.githubusercontent.com/u/30373425?v=4"
                        }}
                    />
                    <Button color="primary" variant="shadow">
                        Add friend
                    </Button>
                </div>
                <div className={'w-auto h-full'}>
                    <p>Rhianne | Somewhere only We know #rhianna #somewereonlyweknow</p>
                </div>
            </div>
            <div className={'absolute right-5 bottom-40 flex flex-col gap-y-8'}>
                <div className={'flex flex-col gap-y-2 items-center'}>
                    <Heart/>
                    <strong>200</strong>
                </div>
                <div className={'flex flex-col gap-y-2 items-center'}>
                    <MessageSquareText/>
                    <strong>200</strong>
                </div>
                <div className={'flex flex-col gap-y-2 items-center'}>
                    <Forward/>
                    <strong>200</strong>
                </div>
            </div>
        </div>
    );
};

export default Reel;
