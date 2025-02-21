"use client";

import { usePathname } from "next/navigation";
import React from "react";
import { Filters } from "./Filters";

export const FiltersWrapper = () => {
	const pathName = usePathname();

	if (pathName === "/members") return <Filters />;

	return null;
};
