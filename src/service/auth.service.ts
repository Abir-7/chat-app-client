/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { decodeToken } from "@/utils/tokenDecode";

import { cookies } from "next/headers";

export const saveCookie = async (token: string) => {
  try {
    cookies().set("accessToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 60, // 60 days
    });
  } catch (error: any) {
    console.log(error, "save cookie");
    throw new Error(error);
  }
};

export const getCurrentUser = async () => {
  const token = cookies().get("accessToken")?.value;

  const decode = await decodeToken(token as string);

  return await decode;
};
export const getCurrentToken = async () => {
  const token = cookies().get("accessToken")?.value;

  return token;
};
export const logout = async () => {
  cookies().delete("accessToken");
};
