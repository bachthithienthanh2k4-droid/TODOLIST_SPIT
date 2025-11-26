"use server";
import { cookies } from "next/headers";
import { IBaseResponse, IIdenxResponse, IShowResponse } from "../types/global";
import { ItodoCreate, ItodoGet } from "../types/todo";
import { IUser } from "../types/user";

export const  TodoCreate = async(data: ItodoCreate) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_WAN}/todos`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
            (await cookies()).get("authToken")?.value}`,
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
export const GetTodoMe = async() => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_WAN}/todos/me`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json", 
            Authorization: `Bearer ${
            (await cookies()).get("authToken")?.value}`,
        },
    });
    const fromdata = await response.json();
    return {
        ok: response.ok,
        status: response.status,
        data: fromdata.data as ItodoGet[],
    } as IIdenxResponse<ItodoGet>;
}      

export const GetTodoUser = async() => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_WAN}/todos/all`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json", 
            Authorization: `Bearer ${
            (await cookies()).get("authToken")?.value}`,
        },
    });
    const fromdata = await response.json();
    return {
        ok: response.ok,
        status: response.status,
        data: fromdata.data as ItodoGet[],
    } as IIdenxResponse<ItodoGet>;
}      
export const GetByIDToDo = async(id:number) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_WAN}/todos/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
            (await cookies()).get("authToken")?.value}`,
        },
    });
    const fromdata = await response.json();
    return {
        ok: response.ok,
        status: response.status,
        data: fromdata.data as ItodoGet,
    } as IShowResponse<ItodoGet>;
}
