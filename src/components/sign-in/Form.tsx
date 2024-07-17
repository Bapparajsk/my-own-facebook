'use client'

import React, {useEffect, useState} from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {Input, Button, User, Card, Dropdown, DropdownMenu, DropdownTrigger, DropdownItem} from "@nextui-org/react";
import {EyeFilledIcon} from "@nextui-org/shared-icons";
import {EyeSlashFilledIcon} from "@nextui-org/shared-icons";
import {SignIpInputs} from "@/interface/inputTypes"
import Link from "next/link"
import { useRouter } from "next/navigation";
import {validatePassword} from "@/lib/validation";
import axios from "axios";
import { useToasterContext } from '@/context/ToasterContext';
import { useUserContext } from '@/context/UserProvider';

interface LogDintUser {
    name: string
    description?: string
    url?: string
}

export const Form = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        clearErrors,
        setError
    } = useForm<SignIpInputs>()

    const router = useRouter();

    const { setToastDetail, dismiss } = useToasterContext();
    const { setUserDetails,userDetails } = useUserContext();

    const onSubmit: SubmitHandler<SignIpInputs> = async ({email, password}) => {

        const id = setToastDetail({message: "please wait...", type: "loading"})

        const body = {
            email,
            password
        }
        try {
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/login`,
                body
            );

            const { token, user, message } = res.data;
            dismiss(id);
            setToastDetail({ message, type: "success" });

            localStorage.setItem("app-token", token);
            setUserDetails(user);
            router.replace("/", { scroll: true});

        } catch (error) {
            console.log(error)
            dismiss(id);
            // @ts-ignore
            setToastDetail({ message: error?.response?.data?.message || "something went wrong please try again...", type: "warning" })
        }
    }

    const [isVisible, setIsVisible] = React.useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    const [logDintUser, setLogDintUser] = useState<LogDintUser[]>([])

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={'w-full h-auto flex items-center justify-center'}>
                <h1 className={'text-xl  py-5 font-medium text-blue-500'}>login your account</h1>
            </div>
            <Card className={`w-full h-full flex flex-col gap-y-2 ${logDintUser.length !== 0 && 'py-3'} px-2 items-center justify-between bg-default-200/40`}>
                {
                    logDintUser.length > 2 ?
                        (<>
                            {logDintUser.slice(0, 2).map((item, idx) => {
                                return <div key={idx} className={'w-full h-full'}>
                                    <User
                                        name={item.name}
                                        description={item.description}
                                        avatarProps={{
                                            src: item.url
                                        }}
                                    />
                                </div>
                            })}
                            <Dropdown backdrop={"blur"}>
                                <DropdownTrigger>
                                    <Button variant="bordered">Open Menu</Button>
                                </DropdownTrigger>
                                <DropdownMenu variant="faded" aria-label="Static Actions" className={'w-[300px]'}>
                                    {
                                        logDintUser.slice(2).map((item, idx) => {
                                            return (
                                                <DropdownItem key={idx}>
                                                    <div key={idx} className={'w-full h-full'}>
                                                        <User
                                                            name={item.name}
                                                            description={item.description}
                                                            avatarProps={{
                                                                src: item.url
                                                            }}
                                                        />
                                                    </div>
                                                </DropdownItem>
                                            )
                                        })
                                    }

                                </DropdownMenu>
                            </Dropdown>
                        </>)
                        : logDintUser.map((item, idx) => {
                            return <div key={idx} className={'w-full h-full'}>
                                <User
                                    name={item.name}
                                    description={item.description}
                                    avatarProps={{
                                        src: item.url
                                    }}
                                />
                            </div>
                        })
                }
            </Card>
            <div className={'w-full h-auto flex flex-col gap-y-4 items-center mt-5 justify-center px-2'}>
                <Input
                    type="email"
                    autoComplete="off"
                    variant={"underlined"}
                    label="Email"
                    placeholder="Enter your email"
                    {...register('email', { required: "this field is required!" })}
                />
                <Input
                    label="Password"
                    variant="underlined"
                    placeholder="Enter your password"
                    autoComplete="off"
                    endContent={
                        <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                            {isVisible ? (
                                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none"/>
                            ) : (
                                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none"/>
                            )}
                        </button>
                    }
                    type={isVisible ? "text" : "password"}
                    className="max-w-xs"
                    {...register("password",
                        {required: "this field is required!",
                            minLength: {
                                value: 8,
                                message: "Password must be at least 8 characters"
                            }
                        })
                    }
                    isInvalid={errors.password && true}
                    errorMessage={errors.password && errors.password.message}
                />

                <div className={'w-full h-auto flex items-center justify-between'}>
                    <Link color="primary" href={'/sign-up'} className={'flex items-center justify-center'}>
                        <span
                            className={'text-blue-600 tracking-wide text-sm px-3 py-[8px] rounded-[12px] hover:bg-blue-500/20'}>
                            Create Account
                        </span>
                    </Link>
                    <Button type={'submit'} color="primary" variant="flat" className={"tracking-wide"}>
                        Login
                    </Button>
                </div>
                <div className={'w-full flex items-center justify-end mt-[-5px] '}>
                    <Link color="primary" href={'/reset-password'}>
                        <span className={'text-blue-600 text-sm px-3 py-[8px] rounded-[12px] tracking-wider hover:text-blue-600/70'}>
                            Forgot?
                        </span>
                    </Link>
                </div>
            </div>
        </form>
    );
}
