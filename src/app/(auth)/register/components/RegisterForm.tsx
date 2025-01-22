"use client";

import { Button, Input } from "@/components";
import { registerSchema, RegisterSchema } from "@/lib";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
  });
  const [isLoading, setIsLoading] = useState(false);

  const doRegister: SubmitHandler<RegisterSchema> = async (data) => {
    console.log(data);
  };
  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(doRegister)}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900 mb-2"
            >
              Name
            </label>
            <Input
              id="name"
              placeholder="John Doe"
              type="name"
              {...register("name")}
            />

            {!isValid && errors.name && (
              <span className="text-red-500 text-sm">
                {errors.name.message as string}
              </span>
            )}
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900 mb-2"
            >
              Email
            </label>
            <Input
              id="email"
              placeholder="example@mail.com"
              type="email"
              {...register("email", {
                pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
              })}
            />

            {!isValid && errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message as string}
              </span>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900 mb-2"
            >
              Password
            </label>
            <Input
              id="password"
              placeholder="*****"
              type="password"
              {...register("password")}
            />
            {!isValid && errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message as string}
              </span>
            )}
          </div>

          <Button className="w-full" type="submit" disabled={isLoading}>
            Register
          </Button>
        </form>
      </div>
    </div>
  );
};
