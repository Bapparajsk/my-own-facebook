import React from 'react';
import {Card, Skeleton} from "@nextui-org/react";

const SkeletonCard = () => {
    return (
        <Card className="w-screen h-screen relative flex justify-end space-y-5 p-4" radius="lg">
            <div>
                <Skeleton className="flex rounded-full w-12 h-12"/>
            </div>
            <div className="w-full flex flex-col gap-2">
                <Skeleton className="h-3 w-3/5 rounded-lg"/>
                <Skeleton className="h-3 w-4/5 rounded-lg"/>
            </div>
        </Card>
    );
};

export default SkeletonCard;
