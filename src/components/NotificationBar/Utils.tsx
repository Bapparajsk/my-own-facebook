import { User, CircleCheckBig, ShieldAlert, TriangleAlert, Info } from "lucide-react";
import { ToastDetails } from "./types";

const Default = (): ToastDetails => {
    return ({
        backGround: 'bg-slate-500/50',
        name: {
            color: 'text-default-50',
            font: 'font-sans'
        },
        message: {
            color: 'text-default-200/80',
            font: 'font-roboto'
        },
        border: 'bg-[#FFEBEB]',
        iconColor: "#FFEBEB",
        HandIcon: <User color={'white'}/>
    })
}

const Success = (): ToastDetails => {
    return ({
        backGround: 'bg-[#E6FFF4]',
        name: {
            color: 'text-[#009836]',
            font: ''
        },
        message: {
            color: 'text-[#009836]/80',
            font: ''
        },
        border: 'bg-[#009836]',
        iconColor: "#009836",
        HandIcon: <CircleCheckBig color={'#009836'} />
    });
}

const Error = (): ToastDetails => {
    return ({
        backGround: 'bg-[#FFEEEF]',
        name: {
            color: 'text-[#FF2D2D]',
            font: ''
        },
        message: {
            color: 'text-[#FF2D2D]/80',
            font: ''
        },
        border: 'bg-[#FF2D2D]',
        iconColor: "#FF2D2D",   
        HandIcon: <ShieldAlert color={'#FF2D2D'} />
    });
}

const Warning = (): ToastDetails => {
    return ({
        backGround: 'bg-[#FFFEEF]',
        name: {
            color: 'text-[#ED7000]',
            font: ''
        },
        message: {
            color: 'text-[#ED7000]/80',
            font: ''
        },
        border: 'bg-[#ED7000]',
        iconColor: "#ED7000",
        HandIcon: <TriangleAlert color={'#ED7000'} />
    });
}

const InfoIcon = (): ToastDetails=> {
    return ({
        backGround: 'bg-[#EEF7FF]',
        name: {
            color: 'text-[#1455DF]',
            font: ''
        },
        message: {
            color: 'text-[#1455DF]/80',
            font: ''
        },
        border: 'bg-[#1455DF]',
        iconColor: "#1455DF",
        HandIcon: <Info color={'#1455DF'} />
    });
}

const colors = (type: string): ToastDetails => {
    switch (type) {
        case 'success':
            return Success();
        case 'error':
            return Error();
        case 'warning':
            return  Warning();
        case 'info':
            return InfoIcon();
        case 'default':
            return Default();
        default:
            return Default();
    }
}

const getPosition = (position: "top-left" | "top-right" | "bottom-left" | "bottom-right") => {
    switch (position) {
        case 'top-left':
            return 'top-3 left-3';
        case 'top-right':
            return 'top-3 right-3';
        case 'bottom-left':
            return 'bottom-3 left-3';
        case 'bottom-right':
            return 'bottom-3 right-3';
        default:
            return 'top-3 right-3';
    }
}

export { Default, Success, Error, Warning, InfoIcon, colors, getPosition };