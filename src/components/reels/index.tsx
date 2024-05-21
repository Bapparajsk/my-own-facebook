import React, {useEffect, useRef, useState} from 'react';
import { useInView } from '@/hooks/useInView';
import RenderReel from "@/components/reels/RenderReel";
import { useNavContext } from "@/context/ReelsContext";

const ReelsContainer: React.FC = () => {

    const { idx, getUrl } = useNavContext();
    const [url, setUrl] = useState("");

    useEffect(() => {
        // @ts-ignore
        const init = async () => {
            // @ts-ignore
            const d = await getUrl(idx);
            console.log(d);
            setUrl(d.videoUrl);
        }

        init();

    }, [idx]);

    return (
        <div className="w-full h-screen relative snap-y snap-mandatory overflow-y-scroll">
            <RenderReel bg={'green'} video={url}/>
        </div>
    );
};

export default ReelsContainer;
