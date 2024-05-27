import {Button, Card, CardBody, CardHeader, Input} from "@nextui-org/react";
import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";

interface VerifyEmail {
    email: string;
}

export const Email = () => {
    const { register: registerEmail, handleSubmit: handleSubmitEmail, formState: { errors: errorsEmail } } = useForm<VerifyEmail>();
    const [otp, setOtp] = useState('');
    const [countdown, setCountdown] = useState<number>(0);
    const [isSendOTP, setIsSendOTP] = useState<boolean>(false);
    const inputs = useRef<(HTMLInputElement | null)[]>([]);

    const onSubmitEmail: SubmitHandler<VerifyEmail> = useCallback((data) => {
        setIsSendOTP(true);
        console.log(data);
    }, []);

    const onSubmitOtp = useCallback((e: any) => {
        e.preventDefault();
        console.log(otp);
    }, [otp]);

    useEffect(() => {
        if (isSendOTP) {
            inputs.current[0]?.focus();
            setNewCountdown();
        }
    }, [isSendOTP]);

    const setNewCountdown = useCallback(() => {
        setCountdown(10);
        let interval = setInterval(() => {
            setCountdown(prev => {
                if (prev <= 1) {
                    clearInterval(interval);
                }
                return prev - 1;
            });
        }, 1000);
    }, []);

    const formatTime = useCallback((seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    }, []);

    const handleChange = useCallback((value: string, index: number) => {
        const otpArray = otp.split('');
        otpArray[index] = value;
        setOtp(otpArray.join(''));
        console.log(otp);
        if (value.length === 1 && index < 3) {
            inputs.current[index + 1]?.focus();
        }
    }, [otp]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && index > 0) {
            inputs.current[index - 1]?.focus();
        }
    }, []);

    const setFocusIndex = useCallback(() => {
        for (let i = 0; i < 4; i++) {
            const item = inputs.current[i];
            if (item?.value === "") {
                item.focus();
                return;
            }
        }
        inputs.current[3]?.focus();
    }, []);

    const otpInputs = useMemo(() => {
        return Array(4).fill('').map((_, index) => (
            <Input
                key={index}
                type="text"
                maxLength={1}
                value={otp[index] || ''}
                onClick={setFocusIndex}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => {inputs.current[index] = el}}
                variant="underlined"
                className="w-full h-full flex !items-center !justify-center"
                color="primary"
            />
        ));
    }, [otp]);

    return (
        <Card className="w-[350px] max-w-[500px] px-5 flex flex-col gap-y-2">
            <CardHeader className="flex items-center justify-center gap-3">
                <div className="flex flex-col items-center justify-center">
                    <h2 className="font-bold text-2xl">Email Validation</h2>
                    <p>Email not found, set a new Email</p>
                </div>
            </CardHeader>
            <CardBody className="h-full w-full flex flex-col gap-y-5">
                <form onSubmit={handleSubmitEmail(onSubmitEmail)} className="w-full flex flex-col gap-y-5">
                    <Input
                        type="email"
                        autoComplete="off"
                        variant="bordered"
                        label="Email"
                        disabled={isSendOTP}
                        placeholder="Enter your email"
                        {...registerEmail('email', { required: 'This field is required!' })}
                    />
                    <Button type="submit" color="primary" variant="shadow" disabled={isSendOTP}>
                        Send OTP
                    </Button>
                </form>
                <form onSubmit={onSubmitOtp} className={`w-full flex flex-col gap-y-5 ${isSendOTP ? 'block' : 'hidden'}`}>
                    <div className="flex space-x-2 items-center justify-between px-2">
                        {otpInputs}
                    </div>
                    <div className="w-full h-auto py-1">
                        <p className="text-blue-400 underline cursor-pointer" onClick={() => setIsSendOTP(false)}>Change Email</p>
                        <p className="text-red-400 text-[14px]">
                            {/* eslint-disable-next-line react/no-unescaped-entities */}
                            Don't receive OTP? <span className="text-blue-400 underline cursor-pointer">{countdown !== 0 ? formatTime(countdown) : 'RESEND OTP'}</span>
                        </p>
                    </div>
                    <Button type="submit" disabled={!otp || otp.length < 4} color="primary" variant="shadow">
                        Verify OTP
                    </Button>
                </form>
            </CardBody>
        </Card>
    );
};
