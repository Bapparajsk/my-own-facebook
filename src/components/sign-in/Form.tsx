'use client'

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {Input, Button, User, Card, Dropdown, DropdownMenu, DropdownTrigger, DropdownItem} from "@nextui-org/react";
import {EyeFilledIcon} from "@nextui-org/shared-icons";
import {EyeSlashFilledIcon} from "@nextui-org/shared-icons";
import {SignUpInputs} from "@/interface/inputTypes"
import Link from "next/link"
import {users} from '@/app/data';

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

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={'w-full h-auto flex items-center justify-center'}>
                <h1 className={'text-xl  py-5 font-medium text-blue-500'}>login your account</h1>
            </div>
            <Card className="w-full h-full flex flex-col gap-y-2 py-3 px-2 items-center justify-between bg-default-200/40">
                {
                    users.length > 2 ?
                        (<>
                            {users.slice(0, 2).map((item, idx) => {
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
                                        users.slice(2).map((item, idx) => {
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

                        : users.map((item, idx) => {
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
                <Input type="email" autoComplete="off" variant={"underlined"} label="Email"
                       placeholder="Enter your email"/>
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
                />

                <div className={'w-full h-auto flex items-center justify-between'}>
                    <Link color="primary" href={'/sign-up'} className={'flex items-center justify-center'}>
                        <span
                            className={'text-blue-600 tracking-wide text-sm px-3 py-[8px] rounded-[12px] hover:bg-blue-500/20'}>
                            Create Account
                        </span>
                    </Link>
                    <Button color="primary" variant="flat" className={"tracking-wide"}>
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
