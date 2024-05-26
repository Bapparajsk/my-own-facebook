'use client'

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {Input, Button } from "@nextui-org/react";
import {EyeFilledIcon} from "@nextui-org/shared-icons";
import {EyeSlashFilledIcon} from "@nextui-org/shared-icons";
import {SignUpInputs, signIconsTypes} from "@/interface/inputTypes"
import {singIconDetails} from "@/app/data";
import {ImageLoader} from "@/components/ImageLoader";
import Link from "next/link"

export const Form = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<SignUpInputs>()
    const onSubmit: SubmitHandler<SignUpInputs> = (data) => console.log(data)

    const [isVisible, setIsVisible] = React.useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    const validateCustom  = (value: string): boolean | string => {
        // console.log(value)
        return true;
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} >
            <div className={'w-full h-auto flex items-center justify-center'}>
                <h1 className={'text-[40px] font-medium text-blue-500'}>sign-up</h1>
            </div>
            <div className="w-full h-20 flex items-center justify-evenly">
                {
                    singIconDetails.map((item, idx) => {
                        return <ImageLoader src={item.url} alt={item.alt} className={'w-8 h-8 object-cover cursor-pointer'} key={idx} />
                    })
                }
            </div>
            <div className={'w-full h-auto flex flex-col gap-y-4 items-center justify-center px-2'}>
                <Input
                    type="text"
                    variant={"underlined"}
                    label="User Name"
                    placeholder="Enter User Name"
                    {...register('useName', { required: "this field is required!", minLength: { value: 5, message: 'User name must be 5 characters long.' }})}
                />
                <Input
                    type="email"
                    autoComplete="off"
                    variant={"underlined"}
                    label="Email"
                    placeholder="Enter your email"
                    {...register('email', {required: 'this field is required!'})}
                />
                <Input
                    label="Password"
                    variant="underlined"
                    placeholder="Enter your password"
                    autoComplete="off"
                    endContent={
                        <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                            {isVisible ? (
                                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                            ) : (
                                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                            )}
                        </button>
                    }
                    type={isVisible ? "text" : "password"}
                    className="max-w-xs"
                    {...register('password', {required: "this field is required!", validate: value => validateCustom(value)})}
                />
                <div className={'w-full h-auto flex items-center justify-between mt-5'}>
                    <Link color="primary" href={'/sign-in'} className={'flex items-center justify-center'}>
                        <span className={'text-blue-600 text-sm tracking-wide px-3 py-[8px] rounded-[12px] hover:bg-blue-500/20'}>
                            Login
                        </span>
                    </Link>
                    <Button type={'submit'} color="primary" variant="flat" className={'tracking-wide'}>
                        Create Account
                    </Button>
                </div>
            </div>
        </form>
    );
}
