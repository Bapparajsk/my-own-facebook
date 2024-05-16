import React from 'react';
import {Input, Navbar, NavbarContent, NavbarItem} from "@nextui-org/react";
import {motion} from "framer-motion";
import {GetIcon} from "@/components/GetIcon";
import {useRouter} from "next/navigation";
import {SearchIcon} from "@nextui-org/shared-icons";

const Nav = ({isNavbarVisible} : {isNavbarVisible:boolean}) => {
    const router = useRouter();

    return (
        <div className={'w-full h-full'}>
            <Navbar>
                <NavbarContent className={'w-full flex h-auto mt-14 flex-col items-start z-50'}>
                    <NavbarItem>
                        <motion.div
                            initial={{opacity: 0, transform: "translateX(-20px)"}}
                            animate={{opacity: 1, transform: "translateX(0px)"}}
                            transition={{duration: 0.5, delay: 0.5}}
                            onClick={() => router.back()}
                            className={'flex w-full gap-x-2 text-default-500'}
                        >
                            <GetIcon name={'move-left'}/>
                            <span>back</span>
                        </motion.div>
                    </NavbarItem>
                    <NavbarItem className={'w-full'}>
                        <div className={'w-full h-auto flex items-center '}>
                            <Input
                                color={'success'}
                                size={'lg'}
                                isClearable
                                radius="lg"
                                variant={'underlined'}
                                placeholder="Type to search..."
                                startContent={
                                    <SearchIcon
                                        className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0"/>
                                }
                            />
                        </div>
                    </NavbarItem>
                </NavbarContent>
            </Navbar>
            <motion.div
                initial={{y: -150}}
                animate={{y: isNavbarVisible ? 0 : -150}}
                transition={{duration: 0.5}}
                className={`w-full bg-transparent/90 fixed top-0 z-30 px-4`}
            >
                <div className={'w-full h-[70px] flex items-center'}>
                    <Input
                        color={'warning'}
                        size={'lg'}
                        isClearable
                        radius="lg"
                        variant={'underlined'}
                        placeholder="Type to search..."
                        startContent={
                            <SearchIcon
                                className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0"/>
                        }
                        // onValueChange={(value: string) => {
                        //     if (value.length === 0) {
                        //         setUseData([{
                        //             url: "https://static.vecteezy.com/system/resources/previews/004/753/002/original/custom-coding-icon-shadowed-detailed-custom-coding-logo-free-vector.jpg",
                        //             name: "bapparaj sk",
                        //             description: "full stack developer",
                        //             friend: true,
                        //         }]);
                        //         return;
                        //     }
                        //     setUseData(
                        //         users.filter((item) => {
                        //             return item.name.toLowerCase().includes(value.toLowerCase());
                        //         })
                        //     )
                        // }}
                    />
                </div>
            </motion.div>
        </div>
    );
};

export default Nav;
