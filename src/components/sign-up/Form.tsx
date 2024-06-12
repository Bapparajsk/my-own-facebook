'use client'

import React, {useEffect, useRef, useState} from 'react';
import {useForm, SubmitHandler} from 'react-hook-form';
import {
    Input,
    Button,
    Spinner,
    Modal,
    ModalContent,
    ModalBody,
    useDisclosure,
    Card,
    CardHeader,
    CardBody
} from "@nextui-org/react";
import {EyeFilledIcon, EyeSlashFilledIcon} from "@nextui-org/shared-icons";
import {SignUpInputs} from "@/interface/inputTypes"
import {singIconDetails} from "@/app/data";
import {ImageLoader} from "@/components/ImageLoader";
import Link from "next/link"
import { validatePassword, userNameValidation, handleValidation } from "@/lib/validation";
import axios from "axios";
import { Toaster, toast } from 'sonner'
import {headers} from "next/headers";
import OtpForm from "@/components/verify/OtpForm";
import {useSearchParams} from "next/navigation";

export const Form = () => {
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
        setError,
        clearErrors,
    } = useForm<SignUpInputs>();
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
    const [isSummit, setIsSummit] = useState<boolean>(false);
    const [accessToken, setAccessToken] = useState<string>("");
    const [isWrongOtp, setIsWrongOtp] = useState<boolean>(false);
    const params = useSearchParams();
    const isInvalid = params.get("invalid");

    const onSubmit: SubmitHandler<SignUpInputs> = async ({userName, email, password}) => {
        const isPasswordValid = handleValidation(validatePassword, password, 'password', setError, clearErrors);
        if (!isPasswordValid) return;

        const isUserNameValid = handleValidation(userNameValidation, userName, 'userName', setError, clearErrors);
        if (!isUserNameValid) return;
        const toastId = toast("please wait", {
            icon: <Spinner size="sm" />
        });
        setIsSummit(true);

        try {
            const body = {
                userName,
                email,
                password
            }
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/register`,
                body
            );

            const { accessToken, message } = res.data;
            setAccessToken(accessToken);
            toast.dismiss(toastId)
            toast.success(message, {
                duration: 4 * 1000
            });
            onOpen();
        } catch (error) {
            console.log(error);
            toast.dismiss(toastId)
            // @ts-ignore
            toast.error(error.response.data.message || "Something what wrong", {
                duration: 4 * 1000
            });
        } finally {
            setIsSummit(false);
        }
    }


    const resendOtp = async () => {
        const toastId = toast("please wait", {
            icon: <Spinner size="sm" />
        });

        const config = {
            headers: {
                'Content-Type': 'application/json',
                accesstoken:  accessToken
            }
        };

       try {
           const res = await axios.post(
               `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/send-otp`,
               {},
               config
           )

           const { accessToken, message } = res.data;
           setAccessToken(accessToken);
           toast.dismiss(toastId)
           toast.success(message, {
               duration: 4 * 1000
           });
       } catch (error) {
           console.log(error);
           toast.dismiss(toastId)
           // @ts-ignore
           toast.error(error.response.data.message || "Something what wrong", {
               duration: 4 * 1000
           });
       }
    }

    const submitOtp  = async (otp: string) => {
        console.log(otp);
        if (otp.length < 4) {
            toast.warning("Please enter 4 digit otp");
            return;
        }
        // setIsWrongOtp
        const toastId = toast("please wait", {
            icon: <Spinner size="sm" />
        });

        const body = {
            otp: otp
        }

        const config = {
            headers: {
                'Content-Type': 'application/json',
                accesstoken:  accessToken
            }
        };

        try {
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/verify-otp`,
                body,
                config
            )

            const { token, message, user } = res.data;
            localStorage.setItem("app-token", token);
            toast.dismiss(toastId)
            toast.success(message, {
                duration: 4 * 1000
            });
        } catch (error) {
            console.log(error);
            setIsWrongOtp(true);
            toast.dismiss(toastId)
            // @ts-ignore
            toast.error(error.response.data.message || "Something what wrong please try again", {
                duration: 4 * 1000
            });
        }
    }

    useEffect(() => {
        if (isInvalid) {
            toast.warning("Something what wrong please try again");
        }
    }, [isInvalid]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} >
            <Toaster expand={false} position="top-right" richColors/>
            <div className={'w-full h-auto flex items-center justify-center'}>
                <h1 className={'text-[40px] font-medium text-blue-500'}>sign-up</h1>
            </div>
            <div className="w-full h-20 flex items-center justify-evenly">
                {
                    singIconDetails.map((item, idx) => {
                        return <ImageLoader alt={item.alt} className={'w-8 h-8 object-cover cursor-pointer'} key={idx} />
                    })
                }
            </div>
            <div className={'w-full h-auto flex flex-col gap-y-4 items-center justify-center px-2'}>
                <Input
                    type="text"
                    variant={"underlined"}
                    label="User Name"
                    placeholder="Enter User Name"
                    {...register('userName',
                        {required: "this field is required!",
                            minLength: {
                                value: 5,
                                message: 'User name must be 5 characters long.'
                            }
                        })
                    }

                    isInvalid={errors.userName && true}
                    errorMessage={errors.userName && errors.userName.message}
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
                        <button className="focus:outline-none" type="button" onClick={() => setIsVisible(!isVisible)}>
                            {isVisible ? (
                                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                            ) : (
                                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
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
                <div className={'w-full h-auto flex items-center justify-between mt-5'}>
                    <Link color="primary" href={'/sign-in'} className={'flex items-center justify-center'}>
                        <span className={'text-blue-600 text-sm tracking-wide px-3 py-[8px] rounded-[12px] hover:bg-blue-500/20'}>
                            Login
                        </span>
                    </Link>
                    <Button type={'submit'} isLoading={isSummit} color="primary" variant="flat" className={'tracking-wide'}>
                        {!isSummit && "Create Account"}
                    </Button>
                </div>
            </div>
            <Modal
                isOpen={isOpen}
                placement={"bottom-center"}
                onOpenChange={onOpenChange}
                size={'full'}
                backdrop={"blur"}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalBody className={'w-full h-full flex flex-col items-center justify-center'}>
                                <Card className={'w-full max-w-[380px] items-center justify-center px-4'}>
                                    <CardHeader className="w-full flex flex-col gap-3  justify-center">
                                        <h2>Verify OTP</h2>
                                        <p>send otp in email {watch('email')}</p>
                                    </CardHeader>
                                    <CardBody>
                                        <OtpForm
                                            submitOTP={submitOtp}
                                            isWrongOTP={isWrongOtp}
                                            resendOTP={resendOtp}
                                            isSendOTP={true}
                                            setIsSendOTP={() => onClose()}
                                        />
                                    </CardBody>
                                </Card>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </form>
    );
}
