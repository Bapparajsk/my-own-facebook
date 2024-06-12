import {Button, Card, CardBody, CardHeader, Input} from "@nextui-org/react";
import React, {useCallback, useEffect, useRef, useState} from "react";
import {set, SubmitHandler, useForm} from "react-hook-form";
import OtpForm from "@/components/verify/OtpForm";

interface VerifyEmail {
    email: string;
}

export const Email = () => {
    const { register, handleSubmit, formState: { errors }, setError, clearErrors } = useForm<VerifyEmail>();
    const [isSendOTP, setIsSendOTP] = useState<boolean>(false)



    const onSubmitEmail: SubmitHandler<VerifyEmail> = useCallback((data) => {
        setIsSendOTP(true);
        console.log(data.email)
    }, []);

    return (
        <Card className="w-full px-5 py-8 flex flex-col gap-y-2 z-50 bg-transparent backdrop-blur-[5px]">
            <CardHeader className="flex items-center justify-center gap-3">
                <div className="flex flex-col items-center justify-center">
                    <h2 className="font-bold text-2xl">Email Validation</h2>
                    <p>Email not found, set a new Email</p>
                </div>
            </CardHeader>
            <CardBody className="h-full w-full flex flex-col gap-y-5">
                <form onSubmit={handleSubmit(onSubmitEmail)} className="w-full flex flex-col gap-y-5">
                    <Input
                        type="email"
                        autoComplete="off"
                        variant="bordered"
                        label="Email"
                        disabled={isSendOTP}
                        isInvalid={errors.email && true}
                        errorMessage={errors.email && errors.email.message}
                        placeholder="Enter your email"
                        {...register('email', { required: 'This field is required!' })}
                    />
                    <Button type="submit" color="primary" variant="shadow" disabled={isSendOTP}>
                        Send OTP
                    </Button>
                </form>
                {isSendOTP && <OtpForm setIsSendOTP={setIsSendOTP} isSendOTP={isSendOTP}/>}
            </CardBody>
        </Card>
    );
};
