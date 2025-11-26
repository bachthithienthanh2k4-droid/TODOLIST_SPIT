"use server";
import { cookies } from "next/headers";
import { IBaseResponse, IIdenxResponse } from "../types/global";

export const getTokens = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_WAN}/tokens/info`, {
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
        data: data.data as ITokenInfo[],
    } as IIdenxResponse<ITokenInfo>;
}
export const createToken = async( datatoken: ITokenCreate ) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_WAN}/tokens/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${(await cookies()).get("accessToken")?.value}`
        },
        body: JSON.stringify(datatoken),

    });
    const data = await response.json();
    return {
        ok: response.ok,
        status: response.status,
        ...data,
    } as IBaseResponse;
}
