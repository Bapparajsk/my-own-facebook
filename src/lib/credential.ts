import axios from "axios";

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

export const updateBirthday = async (day: number, month: number, year: number) => {
    const url = process.env.NEXT_PUBLIC_SERVER_URL;
    const token = localStorage.getItem('app-token');

    if (!url || !token) {
        throw new Error("Internal App error");
    }

    await axios.post(
        `${url}/api/add/change-date-of-birth`,
        { day, month, year },
        {
            headers: {
                token: token
            }
        }
    );
};

export const createImageUrl = async (fileName: string, contentType: string) => {
    const url = process.env.NEXT_PUBLIC_SERVER_URL;
    const token = localStorage.getItem('app-token');

    if (!url || !token) {
        throw new Error("Internal App error");
    }

    const res =  await axios.post(
        `${url}/api/add/create-url-profile-image`,
        { fileName, contentType },
        {
            headers: {
                token: token,
                'Content-Type': "application/json"
            }
        }
    );

    return { url: res.data.url, accessToken: res.data.accessToken } as { url: string, accessToken: string };
}

export const uploadImageToS3 = async (url: string, file: any) => {
    console.log({ url, file });
    await axios.put(
        url,
        file,
        {
            headers: {
                'Content-Type': 'application/octet-stream'
            }
        }
    );
}

export const updateProfileImage = async (accessToken: string) => {
    const token = localStorage.getItem('app-token');
    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

    if (!token || !serverUrl) {
        throw new Error("Internal App error");
    }

    const res = await axios.patch(
        `${serverUrl}/api/add/change-profile-image`,
        { accessToken },
        {
            headers: {
                token: token
            }
        }
    );
    return { imageUrl : res.data.url } as { imageUrl: string };
}