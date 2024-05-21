"use client"

import React, {createContext, useContext, useEffect, useState} from 'react';

const ReelContext = createContext(undefined);

const ReelsProvider = ({ children }: Readonly<{children: React.ReactNode}>) => {

    const [reels, setReels] = useState([
        {
            id: 1,
            videoUrl: "http://localhost:3000/reels/reel1.mp4",
        },
        {
            id: 2,
            videoUrl: "http://localhost:3000/reels/reel2.mp4",
        },
        {
            id: 3,
            videoUrl: "http://localhost:3000/reels/reel3.mp4",
        }
    ]);

    const [idx, setIdx] = useState(1);

    const getUrl = async (id: number) => {
        const p = new Promise(resolve => {
            setTimeout(() => {
                if (id > reels.length) {
                    resolve(reels[0]);
                    setIdx(2);
                } else {
                    resolve(reels[id-1]);
                }
            },4000)
        })

        return await p;
    }

    useEffect(() => {
        console.log(idx);
    }, [idx]);

    return (
        <ReelContext.Provider
            //@ts-ignore
            value={{
                getUrl,
                idx,
                setIdx
            }}
        >
            {children}
        </ReelContext.Provider>
    );
};

const useNavContext = () => {
    const context = useContext(ReelContext);
    if (!context) {
        throw new Error('useNavContext must be used within a NavProvider');
    }
    return context;
};

export { ReelsProvider, useNavContext };
