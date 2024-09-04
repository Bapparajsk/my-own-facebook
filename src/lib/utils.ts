import { twMerge } from "tailwind-merge";
 
export function cn(inputs: string, res: string | undefined) {
  return twMerge(inputs);
}

export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}