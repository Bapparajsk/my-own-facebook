"use client"

import {
    Card,
    CardBody,
    CardHeader,
    Button,
    PopoverContent,
    Popover,
    PopoverTrigger,
    Accordion, AccordionItem,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    useDisclosure,
    Input,
} from "@nextui-org/react";
import React, { useCallback, useState } from "react";
import { GetIcon } from "@/components/GetIcon";
import { AtSign, ChevronLeft, Phone, Plus, X } from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { UserSType } from "@/interface/usertupe";
import { formatEmail } from "@/utils/format";
import { useToasterContext } from "@/context/ToasterContext";
import useScreenSize from "@/hooks/useScreenSize";
import { OtpInput } from "@/components/OtpInput";
import { useMutation } from "@tanstack/react-query";
import { verifyEmail, verifyOtp } from "@/lib/credential";
import { isExistEmailfromList, isValidEmail } from "@/lib/utils";

const MotionCard = motion.create(Card);

export const ContactInformation = ({ user }: { user: UserSType }) => {
    const [emals, setEmails] = useState<{ value: string, isPrimary: boolean }[]>(user.emails);
    const [inputEmail, setInputEmail] = useState<string>('');
    const [otpComponent, openotpComponent] = useState<boolean>(false);


    const router = useRouter();
    const { setNotyDetails } = useToasterContext();
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const size = useScreenSize();

    const verifyEmailMoutation = useMutation({
        mutationFn: async (email: string) => {
            if (!isValidEmail(inputEmail)) {
                throw new Error("Invalid email");
            }

            if (isExistEmailfromList({ list: emals, email})) {
                throw new Error("Email already exist");
            }

            await verifyEmail(email);
        },
        onError: (error) => {
            setNotyDetails({ type: "error", contain: { message: error.message || "An error occurred" } });
        },
        onSuccess: () => {
            setNotyDetails({ type: "success", contain: { message: "OTP sent to your email" } });
            openotpComponent(true);
        }
    });

    const verifyOtpMoutation = useMutation({
        mutationFn: async (otp: string) => await verifyOtp(otp),
        onError: (error) => {
            setNotyDetails({ type: "error", contain: { message: error.message || "An error occurred" } });
        },
        onSuccess: ({ email }: { email: string }) => {
            setEmails([...emals, { value: email, isPrimary: false }]);
            setNotyDetails({ type: "success", contain: { message: "Email added successfully" } });
            setInputEmail('');
            openotpComponent(false);
            onClose()
        }
    });

    const PopUpcContent = useCallback(({ isPrimary }: { isPrimary: boolean }) => {
        return (
            <PopoverContent>
                <div className="px-1 py-2 flex flex-col gap-y-3">
                    <Button
                        color={isPrimary ? "primary" : "secondary"}
                        variant={isPrimary ? "shadow" : "flat"}
                    >
                        {isPrimary ? "Remove to Primary Email" : "Set Primary Email"}
                    </Button>
                    {!isPrimary && <Button color="danger" variant="flat">
                        Delete
                    </Button>}
                </div>
            </PopoverContent>
        )
    }, []);

    return (
        <Card className="w-full max-w-[500px] px-5 py-2 flex flex-col bg-transparent/50 backdrop-blur-[5px] duration-500">
            <CardHeader className="flex-col items-start space-y-2">
                <div className="flex flex-col items-start justify-center gap-y-2">
                    <ChevronLeft onClick={() => router.back()} />
                    <h2 className={'text-2xl font-bold'}>Contact Information</h2>
                    <p className={'font-light text-sm'}>Manage your mobile numbers and email addresses to make sure that
                        your contact info is accurate and up to date.</p>
                </div>

            </CardHeader>
            <CardBody className="gap-y-2">
                {
                    emals.map((email, index) => (
                        <div
                            key={index}
                            className={`flex px-4 py-1.5 ${email.isPrimary ? "bg-primary-400" : "bg-default-200"}/50 rounded-2xl justify-between`}
                        >
                            <div className="flex items-center justify-center gap-x-2 text-white">
                                <AtSign size={20} />
                                <span>{formatEmail(email.value)}</span>
                            </div>
                            <Popover backdrop={'blur'} key={'right-start'} placement={'right-start'} color="default">
                                <PopoverTrigger>
                                    <Button color="danger" variant="light" className="capitalize" size={'sm'} isIconOnly={true}>
                                        <GetIcon name={'notify-setting'} className={'!w-auto !h-auto'} />
                                    </Button>
                                </PopoverTrigger>
                                {PopUpcContent({ isPrimary: email.isPrimary })}
                            </Popover>
                        </div>
                    ))
                }
                <Accordion>
                    <AccordionItem
                        aria-label="Add new contact"
                        hideIndicator
                        title={
                            <div
                                className="flex items-center justify-center gap-x-2 text-primary-400">
                                <Plus />
                                Add new contact
                            </div>
                        }
                    >
                        <MotionCard
                            className={'py-1 bg-transparent shadow-2xl'}
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.2, ease: 'linear' }}
                        >
                            <CardBody className="px-5 gap-y-3">
                                <Button color="secondary" variant="shadow">
                                    <Phone size={20} />
                                    <span>Add mobil number</span>
                                </Button>
                                <Button onPress={onOpen} color="secondary" variant="shadow">
                                    <AtSign size={20} />
                                    <span>Add email address</span>
                                </Button>
                            </CardBody>
                        </MotionCard>
                    </AccordionItem>
                </Accordion>
            </CardBody>
            <Modal
                size={size <= 760 ? "full" : "md"}
                isOpen={isOpen}
                placement={"bottom-center"}
                onOpenChange={onOpenChange}
                motionProps={{
                    variants: {
                        enter: {
                            y: 0,
                            opacity: 1,
                            transition: {
                                duration: 0.3,
                                ease: "easeOut",
                            },
                        },
                    },
                    exit: {
                        y: -20,
                        opacity: 0,
                        transition: {
                            duration: 0.2,
                            ease: "easeIn",
                        },
                    },

                }}
                hideCloseButton
                backdrop={"blur"}
                className={size > 760 ? "py-5" : ""}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                <h2 className={'text-2xl font-bold'}>Add Email Address</h2>
                                <p className={'font-light text-sm'}>Add an email address to your account</p>
                                <Button
                                    color="danger"
                                    variant="flat"
                                    onPress={onClose}
                                    className={`absolute top-${size <= 760 ? "2" : "7"} right-2`}
                                    isIconOnly
                                >
                                    <X size={20} />
                                </Button>
                            </ModalHeader>
                            <ModalBody className="items-center justify-center">
                                <div className="flex flex-col gap-y-3">
                                    <Input
                                        type="email"
                                        label="Email Address"
                                        variant="underlined"
                                        isRequired
                                        fullWidth
                                        className="min-w-[300px]"
                                        value={inputEmail}
                                        onValueChange={(e) => setInputEmail(e)}
                                    />
                                    <Button
                                        color="primary"
                                        variant="shadow"
                                        onPress={() => verifyEmailMoutation.mutate(inputEmail)}
                                        isLoading={verifyEmailMoutation.isPending}
                                        disabled={verifyEmailMoutation.isSuccess}
                                    >
                                        Verify Email
                                    </Button>
                                </div>
                                <AnimatePresence>
                                    {otpComponent &&
                                        <OtpInput
                                            getOtp={(otp) => verifyOtpMoutation.mutate(otp)}
                                            buttonProps={{
                                                color: "primary",
                                                variant: "shadow",
                                                isLoading: verifyOtpMoutation.isPending,
                                                disabled: verifyOtpMoutation.isSuccess
                                            }}
                                        />}
                                </AnimatePresence>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </Card >
    );
};
