import  { AnimatePresence, motion } from "framer-motion";

interface AnimatedCheckIconProps {
    className?: string
    color?: string
    size?: "sm" | "md" | "lg"
    duration?: number
    ease?: "easeIn" | "easeOut" | "easeInOut",
    strokeWidth?: number
}

export const AnimatedCheckIcon = ({
    className,
    color,
    size,
    duration = 0.3,
    ease,
    strokeWidth = 1.5,
} : AnimatedCheckIconProps) => {

    const svgColor = color || "white";
    const svgSize = size === "sm" ? "w-5" : size === "md" ? "w-7" : size === "lg" ? "w-9" : "w-7";
    const svgDuration = Math.min(Math.max(duration, 0.3), 2);
    const svgEase = ease || "easeOut";
    const svgStrokeWidth = Math.min(Math.max(strokeWidth, 1.5), 3);

    return (
        <AnimatePresence>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={svgStrokeWidth}
                stroke="currentColor"
                className={`CheckIcon ${className} ${svgSize}`}
                color={svgColor}
            >
                <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                exit={{ pathLength: 0 }}
                transition={{
                    type: "tween",
                    duration: svgDuration,
                    ease: svgEase
                }}
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
                />
            </svg>
        </AnimatePresence>
    );
} 