"use client";
import { cn } from "@/lib";
import type React from "react";
import type { ReactNode } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

interface Props {
	header: ReactNode | string;
	body?: ReactNode;
	footer?: ReactNode;
	className?: string;
}

export const CardInnerWrapper: React.FC<Props> = ({
	header,
	body,
	footer,
	className,
}) => {
	return (
		<Card className={cn("w-1/2 mx-auto my-4", className)}>
			<CardHeader>
				{typeof header === "string" ? (
					<div className="text-xl font-semibold text-red-400">{header}</div>
				) : (
					<>{header}</>
				)}
			</CardHeader>
			<hr className="border-1 border-gray-300" />
			<CardContent className="flex-1 max-h-[60vh] overflow-y-scroll">
				{body}
			</CardContent>
			{footer && <CardFooter className="mt-3">{footer}</CardFooter>}
		</Card>
	);
};
