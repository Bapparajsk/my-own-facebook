import { FileImage } from "lucide-react"
import React from "react";

interface LinkButtonProps {
    icon: React.ReactNode
    onClick: () => void;
    name: string;
}

export const LinkButton = ({icon, onClick, name}: LinkButtonProps) => {

    return (
        <div className={'w-full h-auto flex items-center gap-x-3 cursor-pointer'} onClick={onClick}>
            {icon}
            <span>{name}</span>
        </div>
    )
}