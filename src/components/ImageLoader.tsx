'use client'

import React from 'react';
import Image from "next/image";
import useScreenSize from "@/hooks/useScreenSize";
import {useRouter} from "next/navigation";
import Link from "next/link";

import google from '@/assets/images/google.png';
import fb from '@/assets/images/fb.png';
import github from '@/assets/images/github.png';


interface Props {
    alt: string;
    className?: string; // Making className optional
}

export const ImageLoader =  ({ alt, className }: Props) => {

    const size = useScreenSize();
    const router = useRouter();

    return <Link href={`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/${alt}`}>
        <Image src={(alt === "google" ? google : alt === "facebook"? fb : github)} alt={alt} className={`${className} ${size >= 1024 ? "grayscale hover:grayscale-0" : ""} transition duration-500`}/>
    </Link>
};

