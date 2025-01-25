import { jwtDecode } from "jwt-decode";
export const decodeToken = async (token: string) => {
  let decode = null;

  if (token) {
    decode = await jwtDecode(token as string);
  }

  return await decode;
};
