"use server";
import { cookies } from "next/headers";
import { IUser, IUserMessage } from "../types/user";
import { IIdenxResponse } from "../types/global";

export const getUsers = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_WAN}/users`, {
        method: "POST",
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

