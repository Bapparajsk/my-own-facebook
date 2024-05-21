"use client"

import { useState, useEffect, RefObject } from 'react';

export const useInView = (elements: RefObject<HTMLElement>[]) => {
    const [currentIndex, setCurrentIndex] = useState<number | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = elements.findIndex((ref) => ref.current === entry.target);
                        setCurrentIndex(index);
                    }
                });
            },
            { threshold: 0.5 } // Adjust threshold as needed
        );

        elements.forEach((element) => {
            if (element.current) {
                observer.observe(element.current);
            }
        });

        return () => {
            elements.forEach((element) => {
                if (element.current) {
                    observer.unobserve(element.current);
                }
            });
        };
    }, [elements]);

    return currentIndex;
};
