"use client";
import React, { useMemo, useState } from "react";
import { FaFemale, FaMale } from "react-icons/fa";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { DualRangeSlider } from "../ui/dual-range-slider";
import { X } from "lucide-react";

export const Filters = () => {
  const [ageValues, setAgeValues] = useState([18, 45]);
  const [orderValue, setOrderValue] = useState("");
  const orderByList = [
    { label: "Last active", value: "updated" },
    { label: "Newest members", value: "created" },
  ];

  const genderList = [
    {
      value: "male",
      icon: FaMale,
    },
    {
      value: "female",
      icon: FaFemale,
    },
  ];


  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedGender = searchParams.get("gender")?.split(",") || [
    "male",
    "female",
  ];
  const handleGenderSelect = (gender: string) => {
    const params = new URLSearchParams(searchParams);
    if (selectedGender.includes(gender)) {
      params.set(
        "gender",
        selectedGender.filter((g) => g !== gender).toString()
      );
    } else {
      params.set("gender", [...selectedGender, gender].toString());
    }
    router.replace(`${pathname}?${params}`);
  };

  const handleAgeSelect = (values: number[]) => {
    const params = new URLSearchParams(searchParams);
    setAgeValues(values);
    params.set("ageRange", values.toString());
    router.replace(`${pathname}?${params}`);
  };

  const handleOrderBy = (value: string) => {
    const params = new URLSearchParams(searchParams);
    setOrderValue(value);
    params.set("orderBy", value);
    router.replace(`${pathname}?${params}`);
  };

  const handleClear = (e: React.MouseEvent) => {
    const params = new URLSearchParams(searchParams);
    e.stopPropagation();
    setOrderValue("");
    params.delete("orderBy");
    router.replace(`${pathname}?${params}`);
  };

  useMemo(() => {
    const params = new URLSearchParams(searchParams);
    if(params.size !== 0) {
      if (params.get("ageRange") !== null) {
        const ageValues = params
          .get("ageRange")
          ?.split(",")
          .map((n) => parseInt(n));
        setAgeValues(ageValues!);
      }
  
      if (params.get("orderBy") !== null) {
        const orderByValue = params.get("orderBy");
        setOrderValue(orderByValue || "");
      }
    }

  }, [searchParams]);

  return (
    <div className="shadow-md py-3 w-full">
      <div className="flex justify-between items-center lg:w-[92%]  2xl:w-[70%] lg:mx-auto text-white">
        <div className="flex gap-2 items-center">
          <div className="text-gray-400 font-semibold text-xl">Results: x</div>
        </div>
        <div className="flex gap-2 items-center">
          <span className="text-black">Gender:</span>
          {genderList.map(({ icon: Icon, value }) => (
            <Button
              key={value}
              size="icon"
              variant={selectedGender.includes(value) ? "default" : "outline"}
              title={value}
              onClick={() => handleGenderSelect(value)}
            >
              <Icon
                size={24}
                color={selectedGender.includes(value) ? "white" : "black"}
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
              {ageValues[0]}-{ageValues[1]}
            </span>
          </div>
          <DualRangeSlider
            id="age-slider"
            className="text-black"
            labelPosition="bottom"
            value={ageValues}
            min={18}
            max={45}
            step={1}
            onValueChange={(values) => handleAgeSelect(values)}
          />
        </div>
        <div className="flex flex-col items-center">
          <p className="text-sm text-black">With photo</p>
          <Switch defaultChecked color="default" />
        </div>
        <div className="relative">
          <Select value={orderValue} onValueChange={handleOrderBy}>
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
                <SelectItem key={index} value={item.value}>
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
