'use client'

import React from 'react';
import Image from "next/image";
import useScreenSize from "@/hook/useScreenSize";

interface Props {
    src: object; // Assuming src is a string representing the image URL
    alt: string;
    className?: string; // Making className optional
}

export const ImageLoader =  ({ src, alt, className }: Props) => {

    const size = useScreenSize();
    console.log(size);
    //
    // @ts-ignore
    return <Image src={src} alt={alt} className={`${className} ${size >= 1024 ? "grayscale hover:grayscale-0" : ""} transition duration-500`}/>;
};

