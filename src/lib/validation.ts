import {UseFormClearErrors, UseFormSetError} from "react-hook-form";
import {SignUpInputs} from "@/interface/inputTypes";

export const validatePassword = (password: string): string | null => {
    if (password.length < 8) {
        return "Password must be at least 8 characters long.";
    }
    if (!/[a-z]/.test(password)) {
        return "Password must contain at least one lowercase letter.";
    }
    if (!/[A-Z]/.test(password)) {
        return "Password must contain at least one uppercase letter.";
    }
    if (!/\d/.test(password)) {
        return "Password must contain at least one number.";
    }
    if (!/[@$!%*?&]/.test(password)) {
        return "Password must contain at least one special character (@$!%*?&).";
    }
    return null;
};

export const userNameValidation = (userName: string): string | null =>  {
    const startsWithLetters = /^[A-Za-z]/;
    const endsWithNumbers = /^[0-9]/;

    if (userName.length < 5) {
        return "Username must be at least 4 characters long.";
    }

    if (!startsWithLetters.test(userName.substring(0, 4))) {
        return "Username must start with exactly 4 of greater than English letters.";
    }

    if (!endsWithNumbers.test(userName.charAt(userName.length - 1))) {
        return "Username must contain at least one number of end with";
    }

    return null;
}

export const handleValidation = (validationFn: (value: string) => string | null, value: string, field: 'password' | 'userName', setError: UseFormSetError<SignUpInputs>, clearErrors: UseFormClearErrors<SignUpInputs>) => {
    const errorMessage = validationFn(value);
    if (errorMessage !== null) {
        setError(field, {
            type: 'validate',
            message: errorMessage
        });
        return false;
    } else {
        clearErrors(field);
        return true;
    }
};


export const isValidBrithDate = (day: number, month: number, year: number) => {
    // Create a Date object for the birth_date
    const birthDate = new Date(year, month - 1, day); // month is 0-indexed

    // Get the current date
    const currentDate = new Date();

    // Calculate the age
    let age = currentDate.getFullYear() - birthDate.getFullYear();
    const monthDiff = currentDate.getMonth() - birthDate.getMonth();
    const dayDiff = currentDate.getDate() - birthDate.getDate();

    // Adjust age if the birth_date hasn't occurred yet this year
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--;
    }

    // Return true if the age is at least 12, otherwise false
    return age >= 12;
}
