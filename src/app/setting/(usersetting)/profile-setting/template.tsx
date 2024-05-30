"use client"

import React from "react";
import { motion } from 'framer-motion'

export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            initial={{x: 200, opacity: 0, scale: 0.5}}
            animate={{x: 0, opacity: 1, scale: 1}}
            transition={{duration: 0.4, ease: 'easeOut'}}
        >
            {children}
        </motion.div>
    )
}
