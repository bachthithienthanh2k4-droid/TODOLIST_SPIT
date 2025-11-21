"use server";
import { cookies } from "next/headers";
import { IUser, IUserMessage } from "../types/user";
import { IIdenxResponse, IShowResponse } from "../types/global";

export const getUsers = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_WAN}/users`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${(await cookies()).get("accessToken")?.value}`
        },
        });

    const data = await response.json();
    return {
        ok: response.ok,
        status: response.status,
        data: data.data as IUser[],
    } as IIdenxResponse<IUser>;
}
export const getUserById = async( id: string ) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_WAN}/users/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${(await cookies()).get("accessToken")?.value}`
        },
    });
    const data = await response.json();
    return {
        ok: response.ok,
        status: response.status,
        data: data.data as IUser,
    } as IShowResponse<IUser>;
}
export const updateUserById = async (id: number, fullname: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_WAN}/users/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${(await cookies()).get("accessToken")?.value}`,
        },
        body: JSON.stringify({ fullname }),   // ✔ Gửi đúng format API yêu cầu
    });

    const data = await response.json();

    return {
        ok: response.ok,
        status: response.status,
        data: data,   // API không trả data, chỉ message
    };
};
export const deleteUserById = async (id: number) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_WAN}/users/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${(await cookies()).get("accessToken")?.value}`,
        },
    });
    const data = await response.json();

    return { 
        ok: response.ok,
        status: response.status,
        data: data, // API không trả data, chỉ message
    };
}
