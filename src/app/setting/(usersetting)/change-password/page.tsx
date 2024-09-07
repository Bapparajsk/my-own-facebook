"use client"

import React from 'react';
import {Password} from "@/components/verify/Password";
import {useMutation} from "@tanstack/react-query";
import {Button} from "@nextui-org/react";
import {useToasterContext} from '@/context/ToasterContext';
import axios from "axios";
import {useRouter} from "next/navigation";

interface PasswordPageProps {
    password: string;
    oldPassword: string | undefined
}

const PasswordPage = () => {

    const {setNotyDetails} = useToasterContext();
    const router = useRouter();

    const { mutate, isPending, isSuccess } = useMutation({
        mutationFn: async ({password, oldPassword}: PasswordPageProps) => {
            if (oldPassword === undefined) {
                throw new Error('Old password is required');
            }

            const token = localStorage.getItem('app-token');
            const url = process.env.NEXT_PUBLIC_SERVER_URL;

            if (!token || !url) {
                throw new Error('Token or url is not found');
            }

            await axios.patch(
                `${url}/api/add/change-password`,
                {password, oldPassword},
                {
                    headers: {
                        token: token,
                        "Content-Type": "application/json"
                    }
                }
            )
        },
        onError: (error) => {
            setNotyDetails({
                type: 'error',
                contain: {message: error.message || "error"}
            });
        },
        onSuccess: () => {
            setNotyDetails({
                type: 'success',
                contain: {message: 'Password set successfully'}
            });
            router.back();
        }
    })

    return (
        <div className={'rounded-2xl w-auto h-auto bg-setting shadow-sm-box'}>
            <Password
                resetOldPass
                onSubmit={(password, oldPassword) => {
                    mutate({password, oldPassword});
                }}
                SubmitButton={
                    <Button
                        type={'submit'}
                        color="secondary"
                        variant="flat"
                        className={'mt-2'}
                        isLoading={isPending}
                        disabled={isSuccess}
                    >
                        Set Password
                    </Button>
                }
            />
        </div>
    );
};

export default PasswordPage;
