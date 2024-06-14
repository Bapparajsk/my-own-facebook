"use client"

import React, {useEffect, useRef, useState} from "react";
import { Chip, Card, CardBody, CardHeader, Input, Select, SelectItem, DatePicker, Button } from "@nextui-org/react";
import { qualification } from '@/app/data'
import {UserSType} from "@/interface/usertupe";
import {BriefcaseBusiness, User} from "lucide-react";
import {isValidBrithDate, userNameValidation} from "@/lib/validation";

export interface BirthDate {
    day: string
    month: string
    year: string
}

interface IProps {
    user: UserSType | undefined
    submitDetails: (name: string | null, role: string, {day, month, year}: BirthDate) => void
}

export interface InvalidState {
    name: {
        valid: boolean
        message: string
    }
    role: {
        valid: boolean
        message: string
    }
    brith: {
        valid: boolean
        message: string
    }
}

export const UserDetails = ({user, submitDetails}: IProps) => {

    const [inputFocus, setInputFocus] = useState<boolean>(false)
    const [submit, setSubmit] = useState<boolean>(false)
    const [invalid, setInvalid] = useState<InvalidState>({
        name: {valid: false, message: ''},
        role: {valid: false, message: ''},
        brith: {valid: false, message: ''},
    });
    const [editName, setEditName] = useState<boolean>(true);

    const nameRef = useRef<HTMLInputElement>(null);
    const selectRef = useRef<HTMLSelectElement>(null);
    const dateRef = useRef<HTMLElement | null>(null)

    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let name: string | null = null;
        console.log(nameRef.current?.value);
        if (nameRef.current && nameRef.current.value.length > 0) {
            name = nameRef.current.value;
            const isValid = userNameValidation(name);
            if (isValid !== null) {
                setInvalid(prevState => ({
                    ...prevState,
                    name: { ...prevState.name, valid: true, message: isValid }
                }))
                return;
            } else{
                setInvalid(prevState => ({
                    ...prevState,
                    name: {...prevState.name, valid: false, message: ""}
                }))
            }
        }

        if (!selectRef.current?.value) {
            setInvalid(prevState => ({
                ...prevState,
                role: { ...prevState.role, valid: true, message: "please select your role" }
            }))
            return;
        } else {
            setInvalid(prevState => ({
                ...prevState,
                role: { ...prevState.role, valid: false, message: "" }
            }))
        }

        const [month, , day, , year] = Array.from(dateRef.current?.children || []).map(child => child.innerHTML);

        if (!day || !month || !year) {
            setInvalid(prevState => ({
                ...prevState,
                brith: { ...prevState.role, valid: true, message: "please enter your Brith Date" }
            }))
            return;
        } else {
            setInvalid(prevState => ({
                ...prevState,
                brith: { ...prevState.role, valid: false, message: "" }
            }))
        }

        const isValidUser = isValidBrithDate(Number(day), Number(month), Number(year))
        if (!isValidUser) {
            setInvalid(prevState => ({
                ...prevState,
                brith: { ...prevState.role, valid: true, message: "You not be 12 year old" }
            }))
            return;
        }

        submitDetails(name, selectRef.current.value, {day, month, year});
    }

    return (
        <Card className="w-full px-5 py-4 flex flex-col z-50 bg-transparent backdrop-blur-[5px]">
            <CardHeader className="flex items-center justify-center gap-3">
                <div className="flex flex-col items-center justify-center">
                    <h2 className="font-bold text-2xl">User Details</h2>
                    <p>Save Your Information</p>
                </div>
            </CardHeader>
            <CardBody className="h-full w-full flex flex-col gap-y-5">
                <form onSubmit={submitForm} className="w-full flex flex-col gap-y-4">
                    <Input
                        isRequired
                        autoFocus={inputFocus}
                        type="text"
                        variant={'underlined'}
                        label="Name"
                        placeholder={user && user.name}
                        ref={nameRef}
                        isReadOnly={editName}
                        isInvalid={invalid.name.valid}
                        errorMessage={invalid.name.message}
                        startContent={<User />}
                        endContent={
                            <Button
                                color="warning"
                                variant="ghost"
                                size={'md'}
                                radius={'md'}
                                className={'text-white'}
                                onClick={() => {
                                    setEditName(!editName);
                                    nameRef.current?.focus();
                                }}
                            >
                                Edit
                            </Button>
                        }
                    />
                    <Select
                        ref={selectRef}
                        placeholder={'Set your Professional'}
                        startContent={ <BriefcaseBusiness /> }
                        isRequired
                        isInvalid={invalid.role.valid}
                        errorMessage={invalid.role.message}
                        variant={'underlined'}
                        label="Select an Role"
                        defaultSelectedKeys={["Full Stack Developer"]}
                    >
                        {qualification.map((qualify) => (
                            <SelectItem key={qualify.key}>
                                {qualify.label}
                            </SelectItem>
                        ))}
                    </Select>
                    <DatePicker
                        ref={dateRef}
                        isInvalid={invalid.brith.valid}
                        errorMessage={invalid.brith.message}
                        variant={'underlined'}
                        label="Birth date"
                        isRequired
                    />

                    <Button type={'submit'} isLoading={submit} color="primary" variant="shadow" className={'mt-3'}>
                        {!submit && "Save changes"}
                    </Button>
                </form>
            </CardBody>
        </Card>
    );
};
