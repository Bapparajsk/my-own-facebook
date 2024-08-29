"use client"

import React, { useEffect, useState } from 'react';
import { User, Card, Input } from "@nextui-org/react";
import { GetIcon } from "@/components/GetIcon";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/context/UserProvider";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react"
import useScreenSize from '@/hooks/useScreenSize';
import { useMutation } from '@tanstack/react-query';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { UserSType } from '@/interface/usertupe';
import { motion } from "framer-motion";

interface UserListProps {
    name: string;
    role: string | undefined;
    imageId: string | undefined;
}

interface FromData {
    email: string;
    password: string;
}

const UserList = () => {

    const router = useRouter();
    const [login, setLogin] = useState<UserListProps[]>([]);
    const [isFetchImages, setIsFetchImages] = useState<boolean>(false);
    const { userDetails, setUserDetails } = useUserContext();
    const [logdingUser, setLogdingUser] = useState<UserListProps | undefined>(undefined);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError
    } = useForm<FromData>()

    const size = useScreenSize();

    const fetchImages = () => {

    }

    const loginMutate = useMutation({
        mutationFn: async ({ email, password }: FromData) => {
            const url = process.env.NEXT_PUBLIC_SERVER_URL;

            if (!url) {
                throw new Error('Server url not found');
            }

            const res = await axios.post(
                `${url}/auth/login`,
                { email, password }
            )

            const { token, user } = res.data as { token: string, user: UserSType, message: string };


            setUserDetails(user);
            setLogin([...login, { name: user.name, role: user.role, imageId: user.profileImage?.profileImageURL }]);
            localStorage.setItem('login-users', JSON.stringify(user));
            localStorage.setItem('app-token', token);
            onOpenChange();
            router.replace('/profile');
        },
        onError: (error) => {
            setError("email", {
                type: 'manual',
                message: "Invalid credentials"
            });
            setError("password", {
                type: 'manual',
                message: "Invalid credentials"
            });
        }
    })

    const onSubmit: SubmitHandler<FromData> = ({ email, password }) => {
        loginMutate.mutate({
            email,
            password
        });
    }

    useEffect(() => {
        const logdata = localStorage.getItem('login-users');
        if (logdata) {
            const data = JSON.stringify([logdata]) as unknown as UserListProps[];
            setLogin(data);
            fetchImages();
        }

        login.map((item) => {
            if (item.imageId) {
                setIsFetchImages(true);
            }
        });

    }, []);

    return (
        <div className={'w-full h-full px-2'}>
            <Card className={'px-3 py-2 flex flex-col gap-y-2'}>
                <motion.div
                    key={userDetails?._id}
                    onClick={() => router.push('/profile', { scroll: true })}
                    className={'w-full h-full cursor-pointer'}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <User
                        name={userDetails?.name}
                        description={userDetails?.role}
                        avatarProps={{
                            src: userDetails?.profileImage?.profileImageURL || "/images/default-forground.png",
                            alt: userDetails?.name
                        }}
                    />
                </motion.div>
                {login.length >= 1 && <hr />}
                {
                    login.map((item, idx) => {
                        return (
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3 }}
                                key={idx}
                                className={'w-full h-full cursor-pointer'}
                                onClick={() => {
                                    setLogdingUser(item);
                                    onOpen();
                                }}
                            >
                                <User
                                    name={item.name}
                                    description={item.role}
                                    avatarProps={{
                                        src: isFetchImages && item.imageId || "/images/default-forground.png",
                                        alt: item.name
                                    }}
                                />
                            </motion.div>
                        )
                    })
                }
                <hr />
                <div onClick={() => {
                    router.push('/sign-in', {
                        scroll: true
                    });
                }} className={'w-full h-full'}>
                    <div className={'w-fit h-auto flex items-center justify-center p-1.5 rounded-full gap-x-2'}>
                        <GetIcon name={'user-plus'} className={'!w-7'} />
                        <span className={'font-light text-[15px] text-default-800'}>Create another profile</span>
                    </div>
                </div>
            </Card>
            <Modal
                isOpen={isOpen}
                placement={size >= 760 ? "center" : "top-center"}
                onOpenChange={onOpenChange}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col w-full justify-center">
                                name: {logdingUser?.name}
                            </ModalHeader>
                            <ModalBody>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <Input
                                        {...register('email', { required: 'This field is required' })}
                                        placeholder="Email"
                                        label="Email"
                                        type='email'
                                        variant='underlined'
                                        isInvalid={errors.email && true}
                                        errorMessage={errors.email && errors.email.message}
                                    />
                                    <Input
                                        {...register('password', { required: 'This field is required' })}
                                        placeholder="Password"
                                        label="Password"
                                        type='password'
                                        variant='underlined'
                                        isInvalid={errors.password && true}
                                        errorMessage={errors.password && errors.password.message}
                                    />
                                    <div className={'w-full h-auto py-3 px-2 mt-6 flex items-center justify-end gap-x-6'}>
                                        <Button
                                            onClick={() => {
                                                loginMutate.reset();
                                                onClose();
                                            }}
                                            isLoading={loginMutate.isPending}
                                            color={"danger"}
                                            variant='flat'
                                        >cancel</Button>
                                        <Button
                                            type='submit'
                                            isLoading={loginMutate.isPending}
                                            color={"primary"}
                                            variant='flat'
                                        >login</Button>
                                    </div>
                                </form>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
};

export default UserList;
