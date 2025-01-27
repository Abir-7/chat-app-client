"use client";
import { FormWrapper } from "@/components/common/Form/FormWrapper";
import InputField from "@/components/common/Form/InputField";
import SubmitButton from "@/components/common/Form/SubmitButton";
import { ISignupUser } from "@/interface/form/login_signup.interface";
import { useCreateUserMutation } from "@/redux/api/userApi/userApi";

import Link from "next/link";
import { useRouter } from "next/navigation";

import React from "react";
import { toast } from "sonner";

const Signup = () => {
  const router = useRouter();
  const [createUser] = useCreateUserMutation();
  const onSubmit = async (data: ISignupUser) => {
    console.log(data);
    const formData = new FormData();

    // Append image if it exists
    if (data.image && data.image.length > 0) {
      formData.append("image", data.image[0]); // Only the first file
    }

    // Append other data as a JSON string
    const otherData = {
      password: data.password,
      customerData: {
        email: data.email,
        name: data.name,
        contactNo: data.contactNo,
        address: data.address,
      },
    };
    formData.append("data", JSON.stringify(otherData));
    const res = await createUser(formData);
    if (res.data?.success) {
      toast.success("User created");
      router.push("/auth/login");
    } else {
      toast.error("Something went wrong!! Maybe render server problem");
    }
  };

  const defaultValues: ISignupUser = {
    email: "",
    image: null,
    name: "",
    contactNo: "",
    address: "",
    password: "",
  };
  return (
    <div className="w-full max-w-md  mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">
        SignUp
      </h2>
      <FormWrapper<ISignupUser>
        defaultValues={defaultValues}
        onSubmit={onSubmit}
      >
        <InputField
          name="email"
          label="Email"
          type="email"
          placeholder="Enter your email"
          validation={{ required: "This field is Required" }}
        />
        <InputField
          name="image"
          label="Image"
          type="file"
          placeholder="Your Image"
          validation={{ required: "This field is Required" }}
        />
        <InputField
          validation={{ required: "This field is Required" }}
          name="name"
          label="Name"
          type="text"
          placeholder="Enter your name"
        />
        <InputField
          validation={{ required: "This field is Required" }}
          name="contactNo"
          label="ContactNo"
          type="text"
          placeholder="Enter your contact number"
        />
        <InputField
          validation={{ required: "This field is Required" }}
          name="address"
          label="Address"
          type="text"
          placeholder="Enter your address"
        />
        <InputField
          validation={{ required: "This field is Required" }}
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
          Already have an account?{" "}
          <Link href="/auth/login" className="text-blue-600 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
