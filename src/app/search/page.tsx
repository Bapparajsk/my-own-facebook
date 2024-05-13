"use client"

import React, {useState} from 'react';
import SearchNav from "@/components/search/SearchNav";
import {Button, Input} from "@nextui-org/react";
import {SearchIcon} from "@nextui-org/shared-icons";
import {users} from "@/app/data";
import {User} from "@nextui-org/react";
import {GetIcon} from "@/components/GetIcon";

interface Ur {
    url: string
    name: string
    description: string
    friend: boolean
}

const Search = () => {
    const [useData, setUseData] = useState<Ur[]>([{
        url: "https://static.vecteezy.com/system/resources/previews/004/753/002/original/custom-coding-icon-shadowed-detailed-custom-coding-logo-free-vector.jpg",
        name: "bapparaj sk",
        description: "full stack developer",
        friend: true,
    }]);

    return (
        <div className={'w-full h-full'}>
            <SearchNav/>
            <div className={'w-full h-full px-6'}>
                <div className={'w-full h-auto '}>
                    <Input
                        color={'warning'}
                        size={"lg"}
                        isClearable
                        radius="lg"
                        variant={'underlined'}
                        placeholder="Type to search..."
                        startContent={
                            <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
                        }
                        onValueChange={(value: string) => {
                            if (value.length === 0) {
                                setUseData([{
                                    url: "https://static.vecteezy.com/system/resources/previews/004/753/002/original/custom-coding-icon-shadowed-detailed-custom-coding-logo-free-vector.jpg",
                                    name: "bapparaj sk",
                                    description: "full stack developer",
                                    friend: true,
                                }]);
                                return;
                            }
                            setUseData(
                                users.filter((item) => {
                                    return item.name.toLowerCase().includes(value.toLowerCase());
                                })
                            )
                        }}
                    />
                </div>
                <div className={'w-full h-full flex items-start flex-col gap-y-2 mt-3'}>
                    {
                        useData.map((user, index) => (
                            <div key={index} className={'w-full flex py-2 justify-between'}>
                                <User
                                    name={user.name}
                                    description={user.description}
                                    avatarProps={{
                                        src: user.url
                                    }}
                                />
                                <Button  color={user.friend ? "success" : "primary"} variant={'bordered'}>
                                    Add Friend
                                    <GetIcon name={user.friend ? 'user-tick' : 'user-plus'}/>
                                </Button>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>

    );
};

export default Search;
