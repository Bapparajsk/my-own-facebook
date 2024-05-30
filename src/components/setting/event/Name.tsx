"use client"

import {Card, CardBody, CardHeader, Input, Button, Avatar} from "@nextui-org/react";
import {TriangleAlert} from "lucide-react";
import React, {useEffect, useState} from "react";
import { SubmitHandler, useForm } from 'react-hook-form';
import {Main} from "@/components/setting/event/Main";


export const Name = () => {
    const [name, setName] = useState('Bapparaj Sk');
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<{ name: string }>();

    const onsubmit: SubmitHandler<{ name: string }> = (data) => console.log(data)

    return (
        <Main
            inputComponent={
                <Input
                    type="text"
                    variant={'underlined'}
                    label="Name"
                    defaultValue={'Bapparaj Sk'}
                    onValueChange={value => setName(value)}
                    {...register('name', {
                        required: 'Name is required',
                        minLength: {
                            value: 5,
                            message: "Name must be at least 5 characters"
                        },
                    })}
                />
            }
            name={name}
            onSubmit={handleSubmit(onsubmit)}
            role={'Software Engineering'}
        />
    );
};
