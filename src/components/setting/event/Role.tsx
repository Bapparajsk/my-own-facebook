"use client"

import { Select, SelectItem } from "@nextui-org/react";
import React, {useState} from "react";
import {Main} from "@/components/setting/event/Main";
import { qualification } from '@/app/data'
import {BriefcaseBusiness} from "lucide-react";


export const Role = () => {

    const [role, setRole] = useState('Software Engineering');

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(role)
    }

    return (
        <Main
            inputComponent={
                <Select
                    startContent={ <BriefcaseBusiness /> }
                    variant={'underlined'}
                    label="Select an Role"
                    defaultSelectedKeys={["se"]}
                    className="max-w-xs"
                >
                    {qualification.map((qualify, idx) => (
                        <SelectItem key={qualify.key} onClick={() => {
                            setRole(qualify.label);
                        }}>
                            {qualify.label}
                        </SelectItem>
                    ))}
                </Select>
            }
            name={'Bapparaj Sk'}
            onSubmit={onSubmit}
            role={role}
        />
    );
};
