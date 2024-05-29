import React from 'react';
import Link from "next/link";
import {User, Card} from "@nextui-org/react";
import {GetIcon} from "@/components/GetIcon";
import {useRouter} from "next/navigation";

const UserList = () => {

    const router = useRouter();

    return (
        <div className={'w-full h-full px-2'}>
            <Card className={'px-3 py-2 flex flex-col gap-y-2'}>
                <Link href={'/profile'} className={'w-full h-full'}>
                    <User
                        name="Bapparaj Sk"
                        description="Full Stack Devoloper"
                        avatarProps={{
                            src: "https://static.vecteezy.com/system/resources/previews/004/753/002/original/custom-coding-icon-shadowed-detailed-custom-coding-logo-free-vector.jpg"
                        }}
                    />
                </Link>
                <Link href={'/sign-in'} className={'w-full h-full'}>
                    <User
                        name="Aaron Dietz"
                        description="Product Designer"
                        avatarProps={{
                            src: "https://th.bing.com/th/id/R.bf9d30c2cc22ea39621197dad1e31cec?rik=9Akq9OdUbvKZrQ&riu=http%3a%2f%2fwww.aarondietz.us%2fwp-content%2fuploads%2f2020%2f02%2ftmp_photo-1440742284086-3edeb282b9f0-imhwpb-4hypugovtbs6pgm.jpg&ehk=AvFA1tuCAihFErAgZHjCek5YkHjpNUCX5ECfNmUFz3E%3d&risl=&pid=ImgRaw&r=0"
                        }}
                    />
                </Link>
                <Link href={'/profile'} className={'w-full h-full'}>
                    <User
                        name="Jane Doe"
                        avatarProps={{
                            src: "https://i.pravatar.cc/150?u=a04258114e29026702d"
                        }}
                    />
                </Link>
                <hr/>
                <div onClick={() => {
                    router.push('/sign-in', {
                        scroll: true
                    });
                }} className={'w-full h-full'}>
                    <div className={'w-fit h-auto flex items-center justify-center p-1.5 rounded-full gap-x-2'}>
                        <GetIcon name={'user-plus'} className={'!w-7'}/>
                        <span className={'font-light text-[15px] text-default-800'}>Create another profile</span>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default UserList;
