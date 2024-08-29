"use client"

import { Select, SelectItem } from "@nextui-org/react";
import React, {useState} from "react";
import {Main} from "@/components/setting/event/Main";
import { qualification } from '@/app/data'
import {BriefcaseBusiness} from "lucide-react";
import { UserSType } from "@/interface/usertupe";


export const Role = ({user} : {user: UserSType}) => {

    const [role, setRole] = useState('Software Engineering');

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(role)
    }

    return (
        <Main
            user={user}
            updateName={false}
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
            onSubmit={onSubmit}
            onSubmitButton={
                <button type="submit" className={'btn btn-primary'}>Save</button>
            }
        />
    );
};
