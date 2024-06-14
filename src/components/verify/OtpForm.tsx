import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Button, Input} from "@nextui-org/react";

interface IProps {
    isSendOTP: boolean,
    setIsSendOTP: () => void,
    resendOTP: () => void,
    submitOTP: (otp: string) => void,
    isWrongOTP: boolean,
}

const OtpForm = ({isSendOTP, setIsSendOTP, resendOTP, submitOTP, isWrongOTP}: IProps) => {
    const [otp, setOtp] = useState('');
    const inputs = useRef<(HTMLInputElement | null)[]>([]);
    const [countdown, setCountdown] = useState<number>(0);

    const setFocusIndex = useCallback(() => {
        for (let i = 0; i < 6; i++) {
            const item = inputs.current[i];
            if (item?.value === "") {
                item.focus();
                return;
            }
        }
        inputs.current[5]?.focus();
    }, []);

    const handleChange = useCallback((value: string, index: number) => {
        const otpArray = otp.split('');
        otpArray[index] = value;
        setOtp(otpArray.join(''));
        if (value.length === 1 && index < 5) {
            inputs.current[index + 1]?.focus();
        }
    }, [otp]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && index > 0) {
            inputs.current[index - 1]?.focus();
        }
    }, []);

    const otpInputs = useMemo(() => {
        return Array(6).fill('').map((_, index) => (
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
                isInvalid={isWrongOTP}
            />
        ));
    }, [otp, isWrongOTP]);

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

    useEffect(() => {
        if (isSendOTP) {
            inputs.current[0]?.focus();
            setNewCountdown();
        }
    }, [isSendOTP]);

    return (
        <form className={`w-full flex flex-col gap-y-5`}>
            <div className="flex space-x-2 items-center justify-between px-2">
                {otpInputs}
            </div>
            <div className="w-full h-auto py-1">
                <p className="text-blue-400 underline cursor-pointer" onClick={setIsSendOTP}>Change
                    Email</p>
                <p className="text-red-400 text-[14px]">
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    Don't receive OTP? <span
                    className="text-blue-400 underline cursor-pointer"
                    onClick={async () => {
                        if(countdown === 0) {
                            resendOTP();
                            setNewCountdown();
                        }
                    }}
                >{countdown !== 0 ? formatTime(countdown) : 'RESEND OTP'}</span>
                </p>
            </div>
            <Button type={'button'} onClick={() =>  submitOTP(otp)} disabled={!otp || otp.length < 4} color="primary" variant="shadow">
                Verify OTP
            </Button>
        </form>
    );
};

export default OtpForm;
