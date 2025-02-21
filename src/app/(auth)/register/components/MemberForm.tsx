"use client";
import { Input } from "@/components";
import React from "react";
import { useFormContext } from "react-hook-form";

export const MemberForm = () => {
	const {
		register,
		getValues,
		formState: { isValid, errors },
	} = useFormContext();
	return (
		<div className="space-y-4">
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
					defaultValue={getValues("name")}
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
					defaultValue={getValues("email")}
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
					defaultValue={getValues("password")}
					type="password"
					{...register("password")}
				/>
				{!isValid && errors.password && (
					<span className="text-red-500 text-sm">
						{errors.password.message as string}
					</span>
				)}
			</div>
		</div>
	);
};
