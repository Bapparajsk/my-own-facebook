'use client'

import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
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
import { EyeFilledIcon, EyeSlashFilledIcon } from "@nextui-org/shared-icons";
import { SignUpInputs } from "@/interface/inputTypes"
import { singIconDetails } from "@/app/data";
import { ImageLoader } from "@/components/ImageLoader";
import Link from "next/link"
import { validatePassword, userNameValidation, handleValidation } from "@/lib/validation";
import axios from "axios";
import OtpForm from "@/components/verify/OtpForm";
import { useSearchParams, useRouter } from "next/navigation";
import { useToasterContext } from "@/context/ToasterContext";

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
    const router = useRouter();

    const { setNotyDetails } = useToasterContext();

    const onSubmit: SubmitHandler<SignUpInputs> = async ({userName, email, password}) => {
        const isPasswordValid = handleValidation(validatePassword, password, 'password', setError, clearErrors);
        if (!isPasswordValid) return;

        const isUserNameValid = handleValidation(userNameValidation, userName, 'userName', setError, clearErrors);
        if (!isUserNameValid) return;

        setNotyDetails({
            startIcon: <Spinner size="sm" />,
            contain: {
                message: "please wait..."
            },
        });
        setIsSummit(true);

        try {
            const body = {
                userName,
                email,
                password
            }

            console.log(body);
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/register`,
                body
            );
            console.log(res.data);
            const { accessToken, message } = res.data;
            setAccessToken(accessToken);

            setNotyDetails({
                contain: {
                    message: message
                },
                type: "success"
            });

            onOpen();
        } catch (error) {
            console.log(error);
            setNotyDetails({
                contain: {
                    // @ts-ignore
                    message: error?.response?.data?.message || "Something what wrong"
                },
                type: "error"
            });
        } finally {
            setIsSummit(false);
        }
    }


    const resendOtp = async () => {
        setNotyDetails({
            startIcon: <Spinner size="sm" />,
            contain: {
                message: "please wait..."
            },
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

            setNotyDetails({
                contain: {
                    message: message
                },
                type: "success"
            });

        } catch (error) {
            console.log(error);
            setNotyDetails({
                contain: {
                    // @ts-ignore
                    message: error?.response?.data?.message || "Something what wrong"
                },
                type: "error"
            });
       }
    }

    const submitOtp  = async (otp: string) => {
        console.log(otp);
        if (otp.length < 4) {

            setNotyDetails({
                contain: {
                    message: "Please enter 4 digit otp"
                },
                type: "warning"
            });
            return;
        }

        setNotyDetails({
            startIcon: <Spinner size="sm" />,
            contain: {
                message: "please wait..."
            },
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

            setNotyDetails({
                contain: {
                    message: message
                },
                type: "success"
            });

            router.replace("/")
        } catch (error) {
            console.log(error);
            setIsWrongOtp(true);

            setNotyDetails({
                contain: {
                    // @ts-ignore
                    message: error?.response?.data?.message || "Something what wrong"
                },
                type: "error"
            });
        }
    }

    useEffect(() => {
        if (isInvalid) {
            setNotyDetails({
                contain: {
                    message: "Something what wrong please try again"
                },
                type: "warning"
            });
        }
    }, [isInvalid]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} >
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
