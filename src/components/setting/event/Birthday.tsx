"use client"

import React from "react";
import { ChevronLeft } from "lucide-react";
import { Card, DatePicker, CardBody, CardHeader, Button } from "@nextui-org/react";
import { parseDate } from "@internationalized/date";
import { useRouter } from 'next/navigation'

export const Birthday = () => {

    const router = useRouter();

    return (
        <Card className={'w-full max-w-[500px] px-5 py-2 flex flex-col bg-transparent/50 backdrop-blur-[5px]'}>
            <CardHeader>
                <div className="flex flex-col items-start justify-center gap-y-2">
                    <ChevronLeft onClick={() => router.back()}/>
                    <h2 className={'text-2xl font-bold'}>Date of birth</h2>
                    <p className={'font-light text-sm'}>Providing your date of birth helps make sure that you get the right experience for your age.</p>
                </div>
            </CardHeader>
            <CardBody className={'gap-y-3'}>
                <DatePicker
                    defaultValue={parseDate("2024-04-04")}
                    label={"Birth date"}
                    variant={'bordered'}
                    isDisabled
                />

                <Button color="primary" variant="flat">
                    Edit
                </Button>
            </CardBody>
        </Card>
    );
};
