"use client"

import React, {useEffect, useRef} from 'react';
import {useInView} from "@/hooks/useInView";
import SkeletonCard from "@/components/reels/SkeletonCard";
import Reel from "@/components/reels/Reel";
import { useNavContext } from "@/context/ReelsContext";

const RenderReel = ({bg, video, isFast = false}: {bg:string, video:string, isFast?:boolean}) => {
    const sectionRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];
    const currentIndex = useInView(sectionRefs);
    const videoRef = useRef<HTMLVideoElement>(null);

    const {  setIdx, idx} = useNavContext();

    useEffect(() => {
        const s = document.getElementById("current-window");
        s?.scrollIntoView({behavior: "instant"});
    }, [video]);

    useEffect(() => {
        if (currentIndex && currentIndex === 2) {
            // @ts-ignore
            setIdx((prevIndex: number) => prevIndex + 1);
            videoRef.current?.pause();
        } else if (currentIndex === 0){
            // @ts-ignore
            setIdx((prevIndex: number) => prevIndex - 1);
            videoRef.current?.pause();
        }
    }, [currentIndex]);

    return (
        <>
            {!isFast && <div ref={sectionRefs[0]}
                             className="w-full h-screen snap-start flex items-center justify-center">
                <SkeletonCard/>
            </div>}
            <div ref={sectionRefs[1]} id={'current-window'}
                 className="w-full h-full snap-start flex items-center justify-center">
               <Reel videoRef={videoRef} videoSrc={video}/>
            </div>
            <div ref={sectionRefs[2]}
                 className="w-full h-screen snap-start flex items-center justify-center">
                <SkeletonCard/>
            </div>
        </>
    );
};

export default RenderReel;
