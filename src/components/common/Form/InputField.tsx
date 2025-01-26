/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React, { ChangeEvent, useState } from "react";
import { useFormContext } from "react-hook-form";

interface InputFieldProps {
  name: string;
  label: string;
  type?: "text" | "email" | "number" | "password" | "date" | "file";
  placeholder?: string;
  className?: string;
  validation?: {
    required?: boolean | string;
    [key: string]: any;
  };
}

const InputField: React.FC<InputFieldProps> = ({
  name,
  label,
  type = "text",
  placeholder = "",
  className = "",
  validation = {},
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const [previews, setPreviews] = useState<string[]>([]);
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newPreviews: string[] = [];
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.result) {
            newPreviews.push(reader.result as string);
            if (newPreviews.length === files.length) {
              setPreviews(newPreviews); // Update the state once all files are loaded
            }
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  return (
    <div className="mb-4">
      <div className="mt-2 grid grid-cols-3 gap-2">
        {previews.map((preview, index) => (
          <Image
            key={index}
            width={200}
            height={200}
            src={preview}
            alt={`Selected preview ${index + 1}`}
            className="mt-2 max-h-48 rounded-lg shadow"
          />
        ))}
      </div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <Input
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(name, validation)}
        className={`input  input-bordered w-full mt-1 ${className}`}
        onChange={(event) => {
          register(name).onChange?.(event);
          handleImageChange(event);
        }}
      />
      {errors[name] && (
        <p className="mt-1 text-sm text-red-600">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};

export default InputField;
