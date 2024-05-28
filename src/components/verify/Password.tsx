"use client"

import React, {useCallback, useState} from "react";
import { Card, CardHeader, CardBody, Input, Button } from "@nextui-org/react";
import { EyeSlashFilledIcon, EyeFilledIcon } from '@nextui-org/shared-icons';
import {SubmitHandler, useForm} from "react-hook-form";
import {validatePassword} from "@/lib/validation";

interface PasswordInput {
    password: string
    confirmPassword: string
}

export const Password = () => {
    const [isVisible, setIsVisible] = useState<{password: boolean, cPassword: boolean}>({
        password: false,
        cPassword: false,
    });
    const [passwordWrongError, setPasswordWrongError] = useState()
    const {
        register,
        handleSubmit,
        formState: { errors},
        setError,
        clearErrors,
    }= useForm<PasswordInput>();

    const handlePasswordSubmit:SubmitHandler<PasswordInput> = useCallback((data) => {
        const { password, confirmPassword } = data;

        let isValid = validatePassword(password);

        if (isValid !== null) {
            setError('password', {
                type: 'validate',
                message: isValid
            });
        } else {
            clearErrors('password');
        }

        if (password !== confirmPassword) {
            setError("confirmPassword", {
                type: "manual",
                message: "Passwords do not match",
            });
        } else {
            clearErrors("confirmPassword");
        }

    }, [setError, clearErrors])

    return (
        <Card className="w-[350px] max-w-[500px] px-5 py-5 flex flex-col gap-y-2 bg-transparent backdrop-blur-[5px]">
            <CardHeader className={'flex flex-col items-center justify-center'}>
                <h2 className="font-bold text-2xl">Set new Password</h2>
                <p className={'text-center'}>save new password, next time login to use</p>
            </CardHeader>
            <CardBody>
                <form onSubmit={handleSubmit(handlePasswordSubmit)} className="flex flex-col gap-y-2">
                    <Input
                        label="Password"
                        variant="bordered"
                        placeholder="Enter your password"
                        endContent={
                            <button className="focus:outline-none" type="button" onClick={() => {
                                setIsVisible(prevState => ({
                                    ...prevState,
                                    password: !prevState.password
                                }));
                            }}>
                                {isVisible.password ? (
                                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                ) : (
                                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                )}
                            </button>
                        }
                        type={isVisible.password ? "text" : "password"}
                        className="max-w-xs"
                        {...register('password', {
                            required: "this field is required!",
                            minLength: {
                                value: 8,
                                message: "Password must be at least 8 characters"
                            }
                        })}
                        isInvalid={errors.password && true}
                        errorMessage={errors.password && errors.password.message}
                    />
                    <Input
                        label="Confirm Password"
                        variant="bordered"
                        placeholder="Enter your password"
                        endContent={
                            <button className="focus:outline-none" type="button" onClick={() => {
                                setIsVisible(prevState => ({
                                    ...prevState,
                                    cPassword: !prevState.cPassword
                                }))
                            }}>
                                {isVisible.cPassword ? (
                                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                ) : (
                                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                )}
                            </button>
                        }
                        type={isVisible.cPassword ? "text" : "password"}
                        className="max-w-xs"
                        {...register('confirmPassword', {
                            required: "this field is required!",
                            minLength: {
                                value: 8,
                                message: "Password must be at least 8 characters"
                            }
                        })}
                        isInvalid={errors.confirmPassword && true}
                        errorMessage={errors.confirmPassword && errors.confirmPassword.message}
                    />
                    <Button type={'submit'} color="primary" variant="shadow" className={'mt-2'}>
                        Shadow
                    </Button>
                </form>
            </CardBody>
        </Card>
    );
};
