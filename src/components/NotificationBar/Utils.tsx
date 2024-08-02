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
        backGround: 'bg-green-500/50',
        name: {
            color: 'text-default-50',
            font: 'font-sans'
        },
        message: {
            color: 'text-default-100',
            font: 'font-roboto'
        },
        border: 'bg-[#ECFFE6]',
        iconColor: "#F5F7F8",
        HandIcon: <CircleCheckBig color={'green'} />
    });
}

const Error = (): ToastDetails => {
    return ({
        backGround: 'bg-red-500/50',
        name: {
            color: 'text-default-50',
            font: 'font-sans'
        },
        message: {
            color: 'text-default-100',
            font: 'font-roboto'
        },
        border: 'bg-[#FFEBEB]',
        iconColor: "#F5F7F8",   
        HandIcon: <ShieldAlert color={'white'} />
    });
}

const Warning = (): ToastDetails => {
    return ({
        backGround: 'bg-yellow-500/50',
        name: {
            color: 'text-default-50',
            font: 'font-sans'
        },
        message: {
            color: 'text-default-50',
            font: 'font-roboto'
        },
        border: 'bg-[#FFEBEB]',
        iconColor: "#F5F7F8",
        HandIcon: <TriangleAlert color={'white'} />
    });
}

const InfoIcon = (): ToastDetails=> {
    return ({
        backGround: 'bg-blue-500/50',
        name: {
            color: 'text-default-50',
            font: 'font-sans'
        },
        message: {
            color: 'text-default-100',
            font: 'font-roboto'
        },
        border: 'bg-[#ECFFE6]',
        iconColor: "#F5F7F8",
        HandIcon: <Info color={'white'} />
    })
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