"use client"

import { forwardRef, ElementRef, ComponentPropsWithoutRef, useContext, useRef, Fragment } from "react"
import { OTPInput, OTPInputContext } from "input-otp"
import { cn } from "@/lib/utils"
import { Minus } from "lucide-react"
import { Button } from "@nextui-org/react"
import { motion } from "framer-motion";

const InputOTP = forwardRef<
    ElementRef<typeof OTPInput>,
    ComponentPropsWithoutRef<typeof OTPInput>
>(({ className, containerClassName, ...props }, ref) => (
    <OTPInput
        ref={ref}
        containerClassName={cn(
            "flex items-center gap-2 has-[:disabled]:opacity-50",
            containerClassName
        )}
        className={cn("disabled:cursor-not-allowed", className)}
        {...props}
    />
))
InputOTP.displayName = "InputOTP"

const InputOTPGroup = forwardRef<
    ElementRef<"div">,
    ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center", className)} {...props} />
))
InputOTPGroup.displayName = "InputOTPGroup"

const InputOTPSlot = forwardRef<
    ElementRef<"div">,
    ComponentPropsWithoutRef<"div"> & { index: number }
>(({ index, className, ...props }, ref) => {
    const inputOTPContext = useContext(OTPInputContext)
    const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index]

    return (
        <div
            ref={ref}
            className={cn(
                `relative flex h-9 w-9 items-center justify-center border-y border-r border-input text-sm shadow-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md ${isActive && "z-10 ring-1 ring-ring"}`,
                className
            )}
            {...props}
        >
            {char}
            {hasFakeCaret && (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
                </div>
            )}
        </div>
    )
})
InputOTPSlot.displayName = "InputOTPSlot"

const InputOTPSeparator = forwardRef<
    ElementRef<"div">,
    ComponentPropsWithoutRef<"div">
>(({ ...props }, ref) => (
    <div ref={ref} role="separator" {...props}>
        <Minus />
    </div>
))
InputOTPSeparator.displayName = "InputOTPSeparator"

type OtpInputProps = {
    getOtp: (otp: string) => void
    buttonProps: ComponentPropsWithoutRef<typeof Button>
}

const OtpInput = ({ getOtp, buttonProps }: OtpInputProps) => {

    const inputRefs = useRef<(HTMLDivElement | null)[]>(Array(6).fill(null))

    const getOtps = (): void => {
        if (!getOtp) return;
        getOtp(inputRefs.current.reduce((otp, el) => {
            return otp + (el?.textContent || "")
        }, ""));
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            exit={{ opacity: 0, y: 20 }}
            className="flex flex-col gap-4"
        >
            <InputOTP maxLength={6} >
                <InputOTPGroup>
                    <InputOTPSlot index={0} ref={el => { inputRefs.current[0] = el; }} />
                    <InputOTPSlot index={1} ref={el => { inputRefs.current[1] = el; }} />
                    <InputOTPSlot index={2} ref={el => { inputRefs.current[2] = el; }} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                    <InputOTPSlot index={3} ref={el => { inputRefs.current[3] = el; }} />
                    <InputOTPSlot index={4} ref={el => { inputRefs.current[4] = el; }} />
                    <InputOTPSlot index={5} ref={el => { inputRefs.current[5] = el; }} />
                </InputOTPGroup>

            </InputOTP>
            <Button onClick={getOtps} {...buttonProps}>Get OTP</Button>
        </motion.div>
    )

}

export { OtpInput }
