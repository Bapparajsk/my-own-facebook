import {Button, Card, CardBody, CardHeader, Input, Chip, Spinner} from "@nextui-org/react";
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

    const { setNotyDetails } = useToasterContext();
    const { setUserDetails } = useUserContext();

    const onSubmitEmail: SubmitHandler<VerifyEmail> =async ({email}) => {
        setNotyDetails({
            type: "default",
            contain: {
                name: "please wait...",
                message: "we are sending otp..."
            },
            isNameFull: true,
        })
        if (token === null){
            setNotyDetails({
                type: "error",
                contain: {
                    name: "token are not valid",
                    message: "please try again..."
                },
                isNameFull: true,
            });
            router.push('/sign-up', {scroll: true});
            return;
        }

        const isExist = emails?.some((item) => item.value === email);

        if (isExist) {
            setNotyDetails({
                type: "warning",
                contain: {
                    name: "email already exists",
                    message: "please try another email..."
                },
                isNameFull: true,
            });
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
            // dismiss(id);
            // setToastDetail({message: `otp send Successful...`, type: 'success'});

            setNotyDetails({
                type: "success",
                contain: {
                    name: "otp send Successful...",
                    message: "please check your email"
                },
                isNameFull: true,
            })

            setIsSendOTP(true);
        } catch (error) {
            console.log(error);        
            setNotyDetails({
                type: "error",
                contain: {
                    //@ts-ignore
                    name: error?.response?.data?.message || "something went wrong",
                    message: "please try again..."
                },
                isNameFull: true,
            })
        }
    }

    const submitOTP = async (otp: string) => {
        const id = setNotyDetails({
            type: "default",
            contain: {
                name: "please wait...",
                message: "we are verifying otp..."
            },
            isNameFull: true,
        })
        if (token === null){
            setNotyDetails({
                type: "error",
                contain: {
                    name: "token are not valid",
                    message: "please try again..."
                },
                isNameFull: true,
            });
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
            // dismiss(id);
            emails?.push({value: watch("email") });
            setNotyDetails({
                type: "success",
                contain: {
                    name: "email add Successful",
                    message: "you can now use this email"
                },
                isNameFull: true,
            })
            setIsSendOTP(true);
        } catch (error) {
            console.log(error);
            setNotyDetails({
                type: "error",
                contain: {
                    //@ts-ignore
                    name: error?.response?.data?.message || "something went wrong",
                    message: "please try again..."
                },
                isNameFull: true,
            });
        }
    }

    const resendOTP = () => {
        onSubmitEmail({email: watch('email')});
    }

    const skip = async () => {
        // const id = setToastDetail({message: `please wait...`, type: 'loading'});
        setNotyDetails({
            startIcon: <Spinner />,
            type: "default",
            contain: {
                name: "please wait...",
                message: "we are verifying your email..."
            },
            isNameFull: true,
        })

        if (token === null){
            setNotyDetails({
                type: "error",
                contain: {
                    name: "token are not valid",
                    message: "please try again..."
                },
                isNameFull: true,
            });
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
            // dismiss(id);
            router.replace('/', {scroll: true});
        } catch (error) {
            console.log(error);
            setNotyDetails({
                type: "error",
                contain: {
                    //@ts-ignore
                    name: error?.response?.data?.message || "something went wrong",
                    message: "please try again..."
                },
                isNameFull: true,
            });
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
