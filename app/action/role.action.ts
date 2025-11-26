'use server';
import { cookies, headers } from "next/headers";
import { IRoleInfo } from "../types/role";
import { IBaseResponse } from "../types/global";

export const createRole = async (data: IRoleInfo) => {
    const accessToken = (await headers()).get("authorization")?.replace("Bearer ", "") || (await cookies()).get("accessToken")?.value || "";  
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_WAN}/roles`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
    }); 
    const fromdata = await response.json();

    return {
        ok: response.ok,
        status: response.status,
        ...fromdata,
    }    as IBaseResponse;
}
 
