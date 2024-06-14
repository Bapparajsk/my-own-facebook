import { UserSType } from '@/interface/usertupe'
import axios from 'axios'
import {BirthDate} from "@/components/verify/UserDetails";
import {qualification} from '@/app/data';


export const getUser = async (token: string): Promise<UserSType | null> => {
    try {
        const headers = {
            token: token,
            containerType: 'application/json'
        }

        const res = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user`,
            {headers}
        )
        return res.data.user as UserSType

    } catch (error) {
        console.log(error)
        return null;
    }
}

interface UserDetails {
    name?: string
    role: string
    dateOfBirth: BirthDate;
}

export const UserDetailsSubmit = async (name: string | null, Role: string, {day, month, year}: BirthDate, token: string): Promise<boolean> => {

    try {
        let r = qualification.find((item) => item.key === Role)!

        const data: UserDetails = {
            role: r.label,
            dateOfBirth: { day, month, year }
        }

        if(name !== null) {
            data.name = name
        }

        const headers = {
            token: token,
            containerType: 'application/json'
        }

        const res = await axios.post(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/verify_update`,
            {data},
            {headers}
        )

        console.log(res);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export const setNewPassword = async (token: string, newPassword: string): Promise<boolean> => {
    try {

        const headers = {
            token: token,
            containerType: 'application/json'
        }

        const res = await axios.post(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/add_new_password`,
            {password: newPassword},
            {headers}
        )
        console.log(res);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}
