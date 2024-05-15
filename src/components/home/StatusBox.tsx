import React from 'react';
import StatusAvatar from "@/components/home/StatusAvatar";

const StatusBox = () => {
    return (
        <div className={'w-full h-auto flex gap-4 items-center'}>
            <StatusAvatar
                id={'sdhjusdf'}
                totalStatusNumber={3}
                imgSrc={'https://images.pexels.com/photos/236047/pexels-photo-236047.jpeg?cs=srgb&dl=clouds-cloudy-countryside-236047.jpg&fm=jpg'}
            />
        </div>
    );
};

export default StatusBox;
