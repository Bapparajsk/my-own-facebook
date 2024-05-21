"use client"

import { useState, useEffect, useRef, MutableRefObject } from 'react';
import { fetchReels, Reel } from '@/lib/fetchReels';

export const useInfiniteScroll = () => {
    const [reels, setReels] = useState<Reel[]>([]);
    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const observerRef: MutableRefObject<IntersectionObserver | null> = useRef(null);
    const lastElementRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const loadReels = async () => {
            setLoading(true);
            const newReels = await fetchReels(page);
            setReels((prevReels) => [...prevReels, ...newReels]);
            setLoading(false);
        };

        loadReels().then(r => console.log(r));
    }, [page]);

    useEffect(() => {
        if (observerRef.current) {
            observerRef.current.disconnect();
        }

        observerRef.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setPage((prevPage) => prevPage + 1);
            }
        });

        if (lastElementRef.current) {
            observerRef.current.observe(lastElementRef.current);
        }

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [lastElementRef.current]);

    return { reels, loading, lastElementRef };
};
