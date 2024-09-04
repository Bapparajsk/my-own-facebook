import axios from "axios";
import { isValidEmail } from "./utils";

export const verifyEmail = async (inputEmail: string) => {
    const url = process.env.NEXT_PUBLIC_SERVER_URL;
    const token = localStorage.getItem('app-token');
    if (!url || !token) {
        throw new Error("Internal App error");
    }

    await axios.post(
        `${url}/api/add/email-otp`,
        { email: inputEmail },
        {
            headers: {
                token: token
            }
        }
    );
};

export const verifyOtp = async (otp: string): Promise<{ email: string }> => {
    const url = process.env.NEXT_PUBLIC_SERVER_URL;
    const token = localStorage.getItem('app-token');

    if (!url || !token) {
        throw new Error("Internal App error");
    }

    const res = await axios.post(
        `${url}/api/add/verify-otp`,
        { otp },
        {
            headers: {
                token: token
            }
        }
    );

    return { email: res.data.email };
};