
import React from "react";
import Link from "next/link";
import {ArrowRight} from "lucide-react";
import {Button} from "@nextui-org/react";


interface ButtonProps {
    link: string
    icon: React.ReactNode
    name: string
}

export const ProfileSettingButton = ({link, icon, name}: ButtonProps) => {
    return (
        <Button
            as={Link}
            href={`profile-setting/event?env=${link}`}
            variant={'flat'}
            color={'primary'}
            className={'justify-between text-white'}
        >
            <div className="flex items-center justify-center gap-x-2">
                {icon}
                <span>{name}</span>
            </div>
            <ArrowRight />
        </Button>
    );
};
