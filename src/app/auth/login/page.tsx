"use client";
import { FormWrapper } from "@/components/common/Form/FormWrapper";
import InputField from "@/components/common/Form/InputField";
import SubmitButton from "@/components/common/Form/SubmitButton";
import { ILoginUser } from "@/interface/form/login_signup.interface";
import { useAuthLoginMutation } from "@/redux/api/authApi/authApi";
import { setToken, setUser } from "@/redux/features/userSlice";

import { saveCookie } from "@/service/auth.service";
import { decodeToken } from "@/utils/tokenDecode";
import Link from "next/link";
import { useRouter } from "next/navigation";

import React from "react";
import { useDispatch } from "react-redux";

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [userLogin] = useAuthLoginMutation();
  const onSubmit = async (data: ILoginUser) => {
    console.log(data);
    const res = await userLogin(data);
    console.log(res);
    if (res.data?.success) {
      const token = res?.data?.data;
      console.log(token);
      await saveCookie(token);
      const user = await decodeToken(token);
      dispatch(setToken(token));
      dispatch(setUser(user));
      console.log(user);
      router.push("/");
    }
  };
  const defaultValues: ILoginUser = {
    email: "",
    password: "",
  };
  return (
    <div className="w-full max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">
        Login
      </h2>
      <FormWrapper<ILoginUser>
        defaultValues={defaultValues}
        onSubmit={onSubmit}
      >
        <InputField
          name="email"
          label="Email"
          type="email"
          placeholder="Enter your email"
          validation={{
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Enter a valid email address",
            },
          }}
        />
        <InputField
          name="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
        />
        <div className="flex justify-center mt-4">
          <SubmitButton label="Login"></SubmitButton>
        </div>
      </FormWrapper>

      <div className="mt-4 text-center">
        <p className="text-gray-600">
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup" className="text-blue-600 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
