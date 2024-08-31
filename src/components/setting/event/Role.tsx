"use client"

import { Button, Select, SelectItem } from "@nextui-org/react";
import React, { useState } from "react";
import { Main } from "@/components/setting/event/Main";
import { qualification } from '@/app/data'
import { BriefcaseBusiness } from "lucide-react";
import { UserSType } from "@/interface/usertupe";
import { getRoleKey } from "@/utils/format";
import { useMutation } from "@tanstack/react-query";
import { useToasterContext } from "@/context/ToasterContext";
import { useUserContext } from "@/context/UserProvider";
import { useRouter } from "next/navigation";
import axios from "axios";


export const Role = ({ user }: { user: UserSType }) => {

    const [role, setRole] = useState(user.role);
    const router = useRouter();
    const { setNotyDetails } = useToasterContext();
    const { setUserDetails } = useUserContext();

    const roleMutation = useMutation({
        mutationFn: async () => {

            console.log({ role, userRole: user.role });
            

            if (role === user.role) {
                throw new Error('No changes made');
            }

            const url = process.env.NEXT_PUBLIC_SERVER_URL;
            const token = localStorage.getItem('app-token');
            if (!url || !token) {
                throw new Error('Invalid token or url');
            }

            await axios.patch(
                `${url}/api/add/change-role`,
                { role },
                { headers: { token } }
            );
        },
        onError: (error) => {

            console.log(error);
            

            setNotyDetails({
                type: `${error.message === 'No changes made' ? "warning" : 'error'}`,
                contain: {
                    message: error.message || 'An error occurred'
                }
            })
            console.log(error);
        },
        onSuccess: () => {
            setUserDetails((prev) => {
                if (!prev) return prev;
                return {
                    ...prev,
                    role: role
                }
            })
            setNotyDetails({
                type: 'success',
                contain: {
                    message: 'Role updated successfully'
                }
            });
            router.back();
        }
    });

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        roleMutation.mutate();
    }

    return (
        <Main
            user={user}
            updateName={false}
            inputComponent={
                <Select
                    startContent={<BriefcaseBusiness />}
                    variant={'underlined'}
                    label="Select an Role"
                    defaultSelectedKeys={[getRoleKey(role)]}
                    fullWidth
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
                <Button
                    type="submit"
                    fullWidth
                    variant={roleMutation.isSuccess ? "shadow" : 'flat'}
                    color={roleMutation.isSuccess ? "success" : "primary"}
                    isLoading={roleMutation.isPending}
                >
                    {!roleMutation.isPending && "Save Changes"}
                </Button>
            }
        />
    );
};
