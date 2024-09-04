"use client"

import React, { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { Card, DatePicker, CardBody, CardHeader, Button } from "@nextui-org/react";
import { parseDate } from "@internationalized/date";
import { useRouter } from 'next/navigation'
import { UserSType } from "@/interface/usertupe";

const getDateString = (day: number, month: number, year: number) => {
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

export const Birthday = ({ user }: { user: UserSType }) => {
    const [isDisabledDatePicker, setIsDisabledDatePicker] = useState<boolean>(true);
    const [dateChangeValue, setDateChangeValue] = useState<{day: number, month: number, year: number}>();
    const [isChange, setIsChange] = useState<boolean>(false);

    const [] = useState<boolean>(false);
    const router = useRouter();

    const { day, month, year } = user.dateOfBirth;
    const Birthdays = getDateString(day, month, year);

    const handleChanges = (data: any) => {
        if (data === null) {
            setIsChange(false);
            return;
        }

        const {day, month, year} = data;

        if (!day || !month || !year) {
            setIsChange(false);
            return;
        }

        const newdate = getDateString(day, month, year);
        setDateChangeValue({day, month, year});
        if (newdate !== Birthdays) {
            setIsChange(true);
        } else {
            setIsChange(false);
        }
    }

    return (
        <Card className={'w-full max-w-[500px] px-5 py-2 flex flex-col bg-transparent/50 backdrop-blur-[5px]'}>
            <CardHeader>
                <div className="flex flex-col items-start justify-center gap-y-2">
                    <ChevronLeft onClick={() => router.back()} />
                    <h2 className={'text-2xl font-bold'}>Date of birth</h2>
                    <p className={'font-light text-sm'}>Providing your date of birth helps make sure that you get the right experience for your age.</p>
                </div>
            </CardHeader>
            <CardBody className={'gap-y-3'}>
                <DatePicker
                    defaultValue={parseDate(Birthdays)}
                    label={"Birth date"}
                    variant={'bordered'}
                    isDisabled={isDisabledDatePicker}
                    onChange={handleChanges}
                />

                <div className={" w-full h-auto gap-x-3 flex justify-center items-center"}>
                    <Button
                        color={isChange? "secondary" : isDisabledDatePicker ? "primary" : "warning"}
                        variant={isChange? "shadow" : isDisabledDatePicker ? "flat" : "solid"}
                        onPress={() => {
                            if (isChange) {
                                // TODO: date upload in server
                                setIsDisabledDatePicker(true);
                                setIsChange(false);
                            } else if (isDisabledDatePicker) {
                                setIsDisabledDatePicker(false);
                            } else {
                                setIsDisabledDatePicker(true);
                            }
                        }}
                        fullWidth
                    >
                        {isChange ? "Save Changes" : isDisabledDatePicker ? "Edit" : "Cancel"}
                    </Button>
                </div>

            </CardBody>
        </Card>
    );
};
