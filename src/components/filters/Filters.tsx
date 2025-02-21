/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import type React from "react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";

import { useFilters } from "@/hooks";
import { X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { DualRangeSlider } from "../ui/dual-range-slider";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";

export const Filters = () => {
	const pathname = usePathname();
	const router = useRouter();
	const searchParams = useSearchParams();
	const {
		filters,
		genderList,
		orderByList,
		selectAge,
		selectGender,
		selectOrder,
		selectWithPhoto,
		totalCount,
	} = useFilters();
	const { ageRange, gender, orderBy, withPhoto } = filters;
	const [orderValue, setOrderValue] = useState(orderBy);

	const handleClear = (e: React.MouseEvent) => {
		const params = new URLSearchParams(searchParams);
		e.stopPropagation();
		setOrderValue("");
		params.delete("orderBy");
		router.replace(`${pathname}?${params}`);
	};

	return (
		<div className="shadow-md py-3 w-full">
			<div className="flex justify-between items-center lg:w-[92%]  2xl:w-[70%] lg:mx-auto text-white">
				<div className="flex gap-2 items-center">
					<div className="text-gray-400 font-semibold text-xl">
						Results: {totalCount}
					</div>
				</div>
				<div className="flex gap-2 items-center">
					<span className="text-black">Gender:</span>
					{genderList.map(({ icon: Icon, value }) => (
						<Button
							key={value}
							size="icon"
							variant={gender.includes(value) ? "default" : "outline"}
							title={value}
							onClick={() => selectGender(value)}
						>
							<Icon
								size={24}
								color={gender.includes(value) ? "white" : "black"}
							/>
						</Button>
					))}
				</div>
				<div className="flex flex-col itmes-center gap-2 w-1/4">
					<div className="w-full flex items-center justify-between">
						<label htmlFor="age-slider" className="text-black">
							Age range
						</label>
						<span className="text-black">
							{ageRange[0]}-{ageRange[1]}
						</span>
					</div>
					<DualRangeSlider
						id="age-slider"
						className="text-black"
						labelPosition="bottom"
						value={ageRange}
						min={18}
						max={45}
						step={1}
						onValueChange={(values) => selectAge(values)}
					/>
				</div>
				<div className="flex flex-col items-center">
					<p className="text-sm text-black">With photo</p>
					<Switch
						color="default"
						defaultChecked
						checked={withPhoto}
						// biome-ignore lint/suspicious/noExplicitAny: <explanation>
						onChange={(checked) => selectWithPhoto(checked as any)}
					/>
				</div>
				<div className="relative">
					<Select
						value={orderValue}
						onValueChange={(value) => {
							selectOrder(value);
							setOrderValue(value);
						}}
					>
						<SelectTrigger className="w-[280px]">
							<SelectValue placeholder="Select an option" />
						</SelectTrigger>
						{orderValue && (
							<Button
								onClick={handleClear}
								variant="ghost"
								className="absolute top-0 right-8 hover:bg-gray-100 p-1 rounded-full hover:bg-transparent"
							>
								<X className="h-4 w-4 text-gray-500" />
							</Button>
						)}

						<SelectContent>
							{orderByList.map((item, index) => (
								<SelectItem key={`${item.value}-${index}`} value={item.value}>
									{item.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			</div>
		</div>
	);
};
