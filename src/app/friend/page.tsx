"use client"

import {Button} from "@nextui-org/react";
import ShowAllFriends from "@/components/fried";
import Link from "next/link";

export default function Friend() {
    return (
        <div className={'w-full h-auto px-4'}>
            <div className={'w-full h-auto flex items-center justify-start gap-x-2 mt-2'}>
                <Button as={Link} href={'/friend/suggestions'} radius="full">
                    Suggestions
                </Button>
                <Button as={Link} href={'/friend/friends'} radius="full">
                    Your friends
                </Button>
            </div>
            <ShowAllFriends/>
        </div>
    );
}
