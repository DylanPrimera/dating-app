"use client";
import { signInUser } from "@/app/actions";
import { Button } from "@/components";
import { Input } from "@/components";
import { loginSchema, LoginSchema } from "@/lib";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid, errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const doLogin: SubmitHandler<LoginSchema> = async (data) => {
    setIsLoading(true);
    try {
      const resp = await signInUser(data);
      if(resp.status === 'success') {
        reset();
        router.push('/members')
      } else {
        toast.error(resp.error as string);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
    
   
  };
  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(doLogin)}>
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
              className={clsx(errors.email && 'focus:ring-rose-500 focus:ring-2')}
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
              className={clsx(errors.password && 'focus:ring-rose-500 focus:ring-2')}
            
            />
            {!isValid && errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message as string}
              </span>
            )}
          </div>

          <Button className="w-full" type="submit" disabled={isLoading}>
            Login
          </Button>
        </form>
        <div className="flex items-center my-5">
          <div className="flex-1 border-t border-gray-500"></div>
          <div className="px-2 text-gray-800">O</div>
          <div className="flex-1 border-t border-gray-500"></div>
        </div>
        <div className="w-full text-center">
          <Link href="/register" className="underline">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
};
