import React from "react";

interface Props {
    size: number;
    width: number | string | undefined
    height: number | string | undefined
    props: {[p: string]: any}
}

export const PlusIcon = ({size = 24, width, height, ...props}: Props) => (
    <svg
        aria-hidden="true"
        fill="none"
        focusable="false"
        height={size || height}
        role="presentation"
        viewBox="0 0 24 24"
        width={size || width}
        {...props}
    >
        <g
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
        >
            <path d="M6 12h12" />
            <path d="M12 18V6" />
        </g>
    </svg>
);
