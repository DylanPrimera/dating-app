"use client";
import { Input } from "@/components";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { format, subYears } from "date-fns";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";

export const MemberDetailForm = () => {
	const {
		register,
		getValues,
		setValue,
		formState: { errors },
	} = useFormContext();
	const [genderValue, setGenderValue] = useState(getValues("gender"));
	const genderList = [
		{ label: "Male", value: "male" },
		{ label: "Female", value: "female" },
	];
	return (
		<div className="space-y-4">
			<div>
				<label
					htmlFor="gender"
					className="block text-sm font-medium leading-6 text-gray-900 mb-2"
				>
					Gender
				</label>
				<Select
					value={genderValue}
					onValueChange={(value) => {
						setGenderValue(value);
						setValue("gender", value);
					}}
				>
					<SelectTrigger className="w-full">
						<SelectValue placeholder="Select an option" />
					</SelectTrigger>

					<SelectContent>
						{genderList.map((item, index) => (
							<SelectItem key={`${item.value}-${index}`} value={item.value}>
								{item.label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				{errors.gender && (
					<span className="text-red-500 text-sm">
						{errors.gender?.message as string}
					</span>
				)}
			</div>
			<div>
				<label
					htmlFor="dateOfBirth"
					className="block text-sm font-medium leading-6 text-gray-900 mb-2"
				>
					Date of Birth
				</label>
				<Input
					id="dateOfBirth"
					max={format(subYears(new Date(), 18), "yyyy-MM-dd")}
					type="date"
					{...register("dateOfBirth")}
				/>

				{errors.dateOfBirth && (
					<span className="text-red-500 text-sm">
						{errors.dateOfBirth?.message as string}
					</span>
				)}
			</div>
			<div>
				<label
					htmlFor="description"
					className="block text-sm font-medium leading-6 text-gray-900 mb-2"
				>
					Description
				</label>
				<Textarea
					id="description"
					defaultValue={getValues("description")}
					placeholder="Description of yours"
					{...register("description")}
					className="resize-none"
				/>

				{errors.description && (
					<span className="text-red-500 text-sm">
						{errors.description?.message as string}
					</span>
				)}
			</div>
			<div>
				<label
					htmlFor="city"
					className="block text-sm font-medium leading-6 text-gray-900 mb-2"
				>
					City
				</label>
				<Input
					id="city"
					placeholder="Type your city"
					defaultValue={getValues("city")}
					type="text"
					{...register("city")}
				/>

				{errors.city && (
					<span className="text-red-500 text-sm">
						{errors.city?.message as string}
					</span>
				)}
			</div>
			<div>
				<label
					htmlFor="country"
					className="block text-sm font-medium leading-6 text-gray-900 mb-2"
				>
					Country
				</label>
				<Input
					id="country"
					placeholder="Type your country"
					defaultValue={getValues("country")}
					type="text"
					{...register("country")}
				/>

				{errors.country && (
					<span className="text-red-500 text-sm">
						{errors.country?.message as string}
					</span>
				)}
			</div>
		</div>
	);
};
