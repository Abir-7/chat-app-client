import React from "react";
import {
  useForm,
  FormProvider,
  SubmitHandler,
  DefaultValues,
} from "react-hook-form";

import { FieldValues } from "react-hook-form";

interface FormWrapperProps<T extends FieldValues> {
  defaultValues: DefaultValues<T>; // Generic default values
  onSubmit: SubmitHandler<T>; // Generic submit handler
  children: React.ReactNode; // Form fields passed as children
}

export const FormWrapper = <T extends FieldValues>({
  defaultValues,
  onSubmit,
  children,
}: FormWrapperProps<T>) => {
  const methods = useForm<T>({ defaultValues });

  const handleSubmitData = (data: T) => {
    onSubmit(data);
    //methods.reset();
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handleSubmitData)}
        className="space-y-4"
      >
        {children}
      </form>
    </FormProvider>
  );
};
