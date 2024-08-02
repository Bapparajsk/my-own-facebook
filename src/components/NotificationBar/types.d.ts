export interface ToastDetails {
    backGround: string;
    name: {
        color: string;
        font: string;
    };
    message: {
        color: string;
        font: string;
    };
    border: string;
    iconColor: string;
    HandIcon: React.ReactNode;
}

export interface NotyProps {
    heading?: string | React.ReactNode;
    contain?: {
        name?: string;
        message?: string;
    }
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    redies?: "sm" | "md" | "lg";
    shadow?: "sm" | "md" | "lg";
    position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
    type?: 'success' | 'error' | 'warning' | 'info' | 'default';
    link?: string;
    userLink?: string;
    isNameFull?: boolean;
    remove?: () => void;
}