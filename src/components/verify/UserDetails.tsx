"use client"

import React from "react";
import { Card, CardBody, CardHeader, Input, Select, SelectItem, DatePicker, Button } from "@nextui-org/react";
import { qualification } from '@/app/data'


export const UserDetails = () => {
    return (
        <Card className="w-[370px] max-w-[500px] px-5 py-4 flex flex-col z-50 bg-transparent backdrop-blur-[5px]">
            <CardHeader className="flex items-center justify-center gap-3">
                <div className="flex flex-col items-center justify-center">
                    <h2 className="font-bold text-2xl">User Details</h2>
                    <p>Save Your Information</p>
                </div>
            </CardHeader>
            <CardBody className="h-full w-full flex flex-col gap-y-5">
                <form className="w-full flex flex-col gap-y-4">
                    <Input isRequired type="text" variant={'underlined'} label="Name" startContent={''}/>
                    <Select
                        startContent={
                            // eslint-disable-next-line react/jsx-no-undef
                            // <BriefcaseBusiness />
                            ""
                        }
                        onSelectionChange={(key) => {
                            console.log(key);
                        }}
                        isRequired
                        variant={'underlined'}
                        label="Select an Role"
                        defaultSelectedKeys={["Full Stack Developer"]}
                        className="max-w-xs"
                    >
                        {qualification.map((qualify) => (
                            <SelectItem key={qualify.key}>
                                {qualify.label}
                            </SelectItem>
                        ))}
                    </Select>
                    <DatePicker
                        variant={'underlined'}
                        label="Birth date"
                        className="max-w-[284px]"
                        isRequired
                        onChange={date => {
                            console.log(date);
                        }}
                    />

                    <Button type={'submit'} color="primary" variant="shadow" className={'mt-3'}>
                        Submit data
                    </Button>
                </form>
            </CardBody>
        </Card>
    );
};
