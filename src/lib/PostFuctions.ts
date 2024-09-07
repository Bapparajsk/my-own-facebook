import axios from "axios";
import { Interface } from "readline";

interface PostUpload {
    inputAccptType: "image" | "video" | string | null;
    inputSrc: { value: string, type: "image" | "video" } | null;
    file: any;
    description: string;
    userDetails: {
        name: string;
    }
}

export const postUpload = async ({
    inputAccptType,
    inputSrc,
    file,
    description,
    userDetails
}: PostUpload) => {
    if ((inputAccptType === "image" || inputAccptType === "video") && (inputSrc === null || file === null)) {
        throw new Error("Please select a file to upload...");
    }

    const app_Token = localStorage.getItem('app-token');

    if (app_Token === null) {
        throw new Error("Token not found");
    }

    if (!file.name || !file.type) {
        throw new Error("File name or type not found");
    }

    const body = {
        fileName: file.name,
        contentType: file.type,
        userName: userDetails.name,
    }

    const headers = {
        token: app_Token,
        containerType: 'application/json'
    }

    const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/post/create-url`,
        body,
        { headers }
    );

    const { url, accessToken } = res.data;

    await axios.put(
        url,
        file,
        {
            headers: {
                'Content-Type': 'application/octet-stream'
            }
        }
    );

    await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/post/add-post`,
        {
            accessToken: accessToken,
            description: description,
        },
        { headers }
    );
};