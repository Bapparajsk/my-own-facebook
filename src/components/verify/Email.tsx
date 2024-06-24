import {Button, Card, CardBody, CardHeader, Input, Chip} from "@nextui-org/react";
import React, {useCallback, useEffect, useRef, useState} from "react";
import {set, SubmitHandler, useForm} from "react-hook-form";
import OtpForm from "@/components/verify/OtpForm";
import {UserSType} from "@/interface/usertupe";
import {hideEmail} from "@/lib/security";
import {CheckIcon} from "@nextui-org/shared-icons";
import axios from "axios";
import {useToasterContext} from '@/context/ToasterContext'
import {useRouter, useSearchParams} from "next/navigation";
import { useUserContext } from '@/context/UserProvider'

interface VerifyEmail {
    email: string;
}

interface EmailProps {
    emails: { value: string }[] | undefined
    token: string | null
}

export const Email = ({emails, token}: EmailProps) => {
    const { register, watch, handleSubmit, formState: { errors }, setError, clearErrors } = useForm<VerifyEmail>();
    const [isSendOTP, setIsSendOTP] = useState<boolean>(false)
    const [isValidOtp, setIsValidOtp] = useState<boolean>(false)
    const router = useRouter()

    const { setToastDetail, dismiss } = useToasterContext();
    const { setUserDetails } = useUserContext();

    const onSubmitEmail: SubmitHandler<VerifyEmail> =async ({email}) => {
        const id = setToastDetail({message: `please wait...`, type: 'loading'});
        if (token === null){
            setToastDetail({message: 'token are not valid', type: 'error'});
            router.push('/sign-up', {scroll: true});
            return;
        }

        const isExist = emails?.some((item) => item.value === email);

        if (isExist) {
            setToastDetail({message: 'email already exists', type: 'warning'});
            return;
        }

        try {
            const headers = {
                token: token,
                containerType: 'application/json'
            }

            await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/api/add/email-otp`,
                {
                    email: email
                },
                {headers}
            )
            dismiss(id);
            setToastDetail({message: `otp send Successful...`, type: 'success'});
            setIsSendOTP(true);
        } catch (error) {
            console.log(error);
            dismiss(id);
            // @ts-ignore
            setToastDetail({message: error?.response?.data?.message || "something went wrong please try again..." , type: 'warning'});
        }
    }

    const submitOTP = async (otp: string) => {
        const id = setToastDetail({message: `please wait...`, type: 'loading'});
        if (token === null){
            setToastDetail({message: 'token are not valid', type: 'error'});
            router.push('/sign-up', {scroll: true});
            return;
        }

        try {
            const headers = {
                token: token,
                containerType: 'application/json'
            }

            await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/api/add/verify-otp`,
                {
                    otp: otp
                },
                {headers}
            )
            dismiss(id);
            emails?.push({value: watch("email") });
            setToastDetail({message: `email add Successful`, type: 'success'});
            setIsSendOTP(true);
        } catch (error) {
            console.log(error);
            dismiss(id);
            // @ts-ignore
            setToastDetail({message: error?.response?.data?.message || "something went wrong please try again..." , type: 'warning'});
        }
    }

    const resendOTP = () => {
        onSubmitEmail({email: watch('email')});
    }

    const skip = async () => {
        const id = setToastDetail({message: `please wait...`, type: 'loading'});
        if (token === null){
            setToastDetail({message: 'token are not valid', type: 'error'});
            router.push('/sign-up', {scroll: true});
            return;
        }

        try {
            const headers = {
                token: token,
                containerType: 'application/json'
            }

            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/verify_successful`,
                {headers}
            )

            const { user, app_token } = res.data;

            setUserDetails(user)
            localStorage.setItem('app-token', app_token);
            dismiss(id);
            router.replace('/', {scroll: true});
        } catch (error) {
            console.log(error);
            dismiss(id);
            // @ts-ignore
            setToastDetail({message: error?.response?.data?.message || "something went wrong please try again..." , type: 'warning'});
        }
    }

    return (
        <Card className="w-full px-5 py-8 flex flex-col gap-y-2 z-50 bg-transparent backdrop-blur-[5px]">
            <CardHeader className="flex flex-col items-center justify-center gap-3">
                <div className="flex flex-col items-center justify-center">
                    <h2 className="font-bold text-2xl">Email Validation</h2>
                    <p>Email not found, set a new Email</p>
                </div>
                <div className="w-full flex flex-col gap-y-3 items-center justify-center">
                    {
                        emails?.map((item, idx) => (
                            <Button key={idx} fullWidth color="primary" variant="flat" className={'justify-between'}>
                                <span className={'text-success-500'}>{hideEmail(item.value)}</span>
                                <Chip
                                    startContent={<CheckIcon />}
                                    variant="bordered"
                                    color="success"
                                    radius={"md"}
                                >
                                    verified
                                </Chip>
                            </Button>
                        ))
                    }
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
                    <div className="w-full flex gap-x-5">
                        <Button fullWidth type="submit" color="primary" variant="shadow" disabled={isSendOTP}>
                            Send OTP
                        </Button>
                        <Button color="warning" variant="shadow" onClick={skip}>
                           skip
                        </Button>
                    </div>
                </form>
                {isSendOTP &&
                    <OtpForm
                        submitOTP={submitOTP}
                        isSendOTP={true}
                        setIsSendOTP={() => setIsSendOTP(false)}
                        isWrongOTP={isValidOtp}
                        resendOTP={resendOTP}
                    />
                }
            </CardBody>
        </Card>
    );
};
