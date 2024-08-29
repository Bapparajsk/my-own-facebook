"use client"

import { Input, Button } from "@nextui-org/react";
import { useForm } from 'react-hook-form';
import { Main } from "@/components/setting/event/Main";
import { UserSType } from "@/interface/usertupe";
import { useMutation } from "@tanstack/react-query";
import { useToasterContext } from "@/context/ToasterContext";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/context/UserProvider";

export const Name = ({ user }: { user: UserSType }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm<{ name: string }>();

    const { setNotyDetails } = useToasterContext();
    const { setUserDetails } = useUserContext();
    const router = useRouter();

    const submitMutation = useMutation({
        mutationFn: async ({name}: {name: string}) => {
            
            if (name === user.name) {
                setNotyDetails({
                    type: "warning",
                    contain: {
                        message: 'No changes made'
                    }
                })
                return;
            }

            await new Promise((resolve, rej) => setTimeout(resolve, 1000));
            
        },
        onError: (error) => {
            setNotyDetails({
                type: 'error',
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
                    name: watch('name')
                }
            })
            setNotyDetails({
                type: 'success',
                contain: {
                    message: 'Name updated successfully'
                }
            });
            router.back();
        }
    })
    
    return (
        <Main
            user={user}
            inputComponent={
                <Input
                    type="text"
                    variant={'underlined'}
                    label="Name"
                    defaultValue={user.name}
                    {...register('name', {
                        required: 'Name is required',
                        minLength: {
                            value: 5,
                            message: "Name must be at least 5 characters"
                        },
                    })}
                />
            }
            onSubmit={handleSubmit((data) => submitMutation.mutate(data))}
            onSubmitButton={
                <Button
                    type="submit"
                    fullWidth
                    variant={submitMutation.isSuccess ? "shadow" : 'flat'}
                    color={submitMutation.isSuccess ? "success" : "primary"}
                    isLoading={submitMutation.isPending}
                >
                    {!submitMutation.isPending && "Save Changes"}
                </Button>
            }
        />
    );
};
