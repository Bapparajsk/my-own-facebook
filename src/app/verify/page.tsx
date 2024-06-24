"use client"

import React, {useRef, useEffect, useState} from 'react';
import {Email} from "@/components/verify/Email";
import {useSearchParams, useRouter } from 'next/navigation'
import {useToasterContext} from '@/context/ToasterContext'
import {getUser, setNewPassword} from "@/lib/user";
import {BirthDate, UserDetails} from "@/components/verify/UserDetails";
import {UserDetailsSubmit} from '@/lib/user'
import {Password} from "@/components/verify/Password";
import {UserSType} from "@/interface/usertupe";

const Verify = () => {

    const videoRef = useRef<HTMLVideoElement>(null);
    const params = useSearchParams();
    const router = useRouter();
    const token = params.get('token');
    const [nextStep, setNextStep] = useState<number>(1);

    useEffect(() => {
        if (token === null) {
            setToastDetail({message: 'token are not valid', type: 'error'});
            router.back();
            return;
        }

        init(token).catch(e => console.log(e));

    }, [token]);

    const { setToastDetail, dismiss } = useToasterContext();
    const [userDetails, setUserDetails] = useState<UserSType>()

    const init = async (token: string) => {
        const data = await getUser(token);

        if (data === null) {
            setToastDetail({message: 'token are not valid', type: 'error'});
            router.push('/sign-up', {scroll: true});
            return;
        }
        console.log(data);
        setUserDetails(data)
        setToastDetail({message: `welcome to our app ${data.name}`, type: 'success'});
    }

    const submitUserDetails = async (name: string | null, role: string, {day, month, year}: BirthDate) => {
        const id = setToastDetail({message: `please wait...`, type: 'loading'});
        if (token === null){
            setToastDetail({message: 'token are not valid', type: 'error'});
            router.push('/sign-up', {scroll: true});
            return;
        }

        const isSuccess = await UserDetailsSubmit(name, role, {day, month, year}, token);
        dismiss(id)
        if (!isSuccess) {
            setToastDetail({message: `something went wrong, please try again...`, type: 'error'});
            return;
        }
        setToastDetail({message: `Data Submitted successful...`, type: 'success'});
        setNextStep(3);
    }

    const submitPassword = async (password: string) => {
        const id = setToastDetail({message: `please wait...`, type: 'loading'});
        if (token === null){
            setToastDetail({message: 'token are not valid', type: 'error'});
            router.push('/sign-up', {scroll: true});
            return;
        }

        const isSuccess = await setNewPassword(token, password);
        dismiss(id);
        if (!isSuccess) {
            setToastDetail({message: `something went wrong, please try again...`, type: 'error'});
            return;
        }
        setToastDetail({message: `Data Submitted successful...`, type: 'success'});
        setNextStep(2);
    }

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.disablePictureInPicture = true;
        }

        return () => {
            setUserDetails(undefined);
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
            <div className={'w-full max-w-[500px] border-3 border-green-200 rounded-2xl h-auto bg-transparent'}>
                {
                    nextStep === 1 ? ( <Password onSubmit={submitPassword}/> ) :
                    nextStep === 2 ? ( <UserDetails user={userDetails} submitDetails={submitUserDetails}/> ) : ( <Email token={token} emails={userDetails?.emails}/> )
                }
            </div>
        </div>
    );
};

export default Verify;
