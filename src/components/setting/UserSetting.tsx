"use client"

import { Card, CardBody, Button } from "@nextui-org/react";
import { ShieldCheck, LockKeyhole, ArrowRight, UserCog, LogOut } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export const UserSetting = () => {

    return (
        <div className={'w-full h-full px-2'}>
            <div className={'w-full flex items-center justify-start py-3 pl-2'}>
                <ShieldCheck size={33} color={'#0457C0'} className={'drop-shadow-md'} />
                <span className={'text-xl text-[#0457C0]'}>Security</span>
            </div>
            <Card className={'px-3 py-5 flex flex-col gap-y-2'}>
                <Button
                    as={Link}
                    href={'/setting/profile-setting'}
                    color="success"
                    variant="flat"
                    className={'justify-between'}
                >
                    <div className="flex items-center justify-center gap-x-2">
                        <UserCog />
                        <span>Profile Setting</span>
                    </div>
                    <ArrowRight />
                </Button>
                <Button
                    as={Link}
                    href={'/setting/change-password'}
                    color="primary"
                    variant="flat"
                    className={'justify-between'}
                >
                    <div className="flex items-center justify-center gap-x-2">
                        <LockKeyhole />
                        <span>Change Password</span>
                    </div>
                    <ArrowRight />
                </Button>
                <Button
                    color="danger"
                    variant="shadow"
                    className={'justify-start'}
                >
                    <LogOut />
                    Log out
                </Button>
            </Card>
        </div>
    );
};
