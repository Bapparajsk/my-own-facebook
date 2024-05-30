import {Avatar, Button, Card, CardBody, CardHeader, Input} from "@nextui-org/react";
import {ChevronLeft, TriangleAlert} from "lucide-react";
import React from "react";
import { useRouter } from 'next/navigation';

interface IProps {
    inputComponent: React.ReactNode
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
    name?: string
    role?: string
}

export const Main = ({inputComponent, onSubmit, name, role}: IProps) => {

    const router = useRouter();

    return (
        <Card className="w-full max-w-[500px] px-5 py-2 flex flex-col bg-transparent/50 backdrop-blur-[5px]">
            <CardHeader>
                <div className="w-full">
                    <div className="flex flex-col items-start justify-center gap-y-2">
                        <ChevronLeft onClick={() => router.back()}/>
                        <span className={'text-xl'}>Name</span>
                    </div>
                    <div className="flex flex-col items-center justify-center mt-5">
                        <Avatar disableAnimation={true} src="https://i.pravatar.cc/150?u=a04258114e29026708c"
                                size="lg"/>
                        <h3 className={'font-bold text-medium'}>{name}</h3>
                        <p className={'font-light text-sm'}>{role}</p>
                    </div>
                </div>
            </CardHeader>
            <CardBody>
                <form onSubmit={onSubmit} className={'flex flex-col gap-y-3'}>
                    {inputComponent}
                    <div className={'flex items-start gap-x-2'}>
                        <TriangleAlert color={'#F5A524'}/>
                        <p className={'font-light text-[12px] text-[#F5A524]'}>If you change your name,
                            you can't change it again for 60 days.</p>
                    </div>
                    <Button type={'submit'} color="primary" variant="shadow">
                        Save Changes
                    </Button>
                </form>
            </CardBody>
        </Card>
    );
};
