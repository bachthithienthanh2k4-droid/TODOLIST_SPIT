"use server";
import { cookies, headers } from "next/headers";
import { Ilogin, ILoginReponse, ILoginResult, IRegister } from "../types/auth";
import { IBaseResponse, IShowResponse } from "../types/global";

export const login = async(data: Ilogin) => {
  const response = await fetch( `${process.env.NEXT_PUBLIC_API_WAN}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    next: { tags: ["auth.login"] },
  });

  const fromdata = await response.json();

  if (response.ok) {
    const result = fromdata.data as ILoginReponse
    if (result) {
      const cookieStore = await cookies();
      cookieStore.set({
        name: "accesstoken",
        value: result.accessToken
      });
      cookieStore.set({
        name: "refreshtoken",
        value: result.refreshToken
      });
    }
  }

  return {
    ok: response.ok,
    status: response.status,
    ...fromdata,
  } as IShowResponse<ILoginReponse>;
}

export const Register = async (data: IRegister) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_WAN}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const fromdata = await response.json();

    return {
      ok: response.ok,
      status: response.status,
      ...fromdata,
    } as IBaseResponse;
};