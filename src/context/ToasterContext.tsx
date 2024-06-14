"use client"

import React, {createContext, useContext, useState} from 'react';
import {toast, Toaster} from 'sonner'


export interface ToastDetails {
    message: string;
    type: "success" | "warning" | "error" | "loading";
    duration?: number;
}

interface ToasterContextType {
    toastDetails: ToastDetails | undefined;
    setToastDetail: (date: ToastDetails) => string | number;
    dismiss: (id: string | number) =>  void;
}

const ToasterContext = createContext<ToasterContextType>({
    toastDetails: undefined,
    setToastDetail: (date: ToastDetails) => "",
    dismiss: (id: string | number) => {}
});

const ToasterProvider = ({ children }: Readonly<{children: React.ReactNode}>) => {
    const [toastDetails, setToastDetails] = useState<ToastDetails>()

    // useEffect(() => {
    //     if (toastDetails === undefined) {
    //         return;
    //     }
    //
    //     const event = toast[toastDetails.type];
    //     event(toastDetails.message, {
    //         duration: 5 * 1000,
    //     });
    //
    // }, [toastDetails]);

    const setToastDetail = (date: ToastDetails) => {
        const event = toast[date.type];
        return event(date.message, {
            duration: date.duration || 5000,
        });
    }

    const dismiss = (id: string | number) => {
        toast.dismiss(id);
    }

    return (
        <ToasterContext.Provider
            value={{
                toastDetails,
                setToastDetail,
                dismiss
            }}
        >
            <Toaster  richColors position="top-right"/>
            {children}
        </ToasterContext.Provider>
    );
};

const useToasterContext = () => {
    const context = useContext(ToasterContext);
    if (!context) {
        throw new Error('useNavContext must be used within a NavProvider');
    }
    return context;
};

export { ToasterProvider, useToasterContext };
