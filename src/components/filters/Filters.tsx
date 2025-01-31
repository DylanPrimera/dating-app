"use client";
import React, { useState } from "react";
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

export const Filters = () => {
  const [ageValues, setAgeValues] = useState([18, 45]);
  const orderByList = [
    { label: "Last active", value: "updated" },
    { label: "Newest members", value: "created" },
  ];

  const genderList = [
    {
      value: "Male",
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
  const handleAgeSelect = (values: number[]) => {
    setAgeValues(values)
    const params = new URLSearchParams(searchParams);
    params.set('ageRange', values.toLocaleString());
    router.replace(`${pathname}?${params}`);
   
    console.log(values);
  };

  return (
    <div className="shadow-md py-3 w-full">
      <div className="flex justify-between items-center lg:w-[92%]  2xl:w-[70%] lg:mx-auto text-white">
        <div className="flex gap-2 items-center">
          <div className="text-gray-400 font-semibold text-xl">Results: x</div>
        </div>
        <div className="flex gap-2 items-center">
          <span className="text-black">Gender:</span>
          {genderList.map(({ icon: Icon, value }) => (
            <Button key={value} size="icon" variant="outline" title={value}>
              <Icon size={24} color="black" />
            </Button>
          ))}
        </div>
        <div className="flex flex-col itmes-center gap-2 w-1/4">
            <div className="w-full flex items-center justify-between">
            <label htmlFor="age-slider" className="text-black">Age range</label>
            <span className="text-black">{ageValues[0]}-{ageValues[1]}</span>
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
        <div className="w-auto">
          <Select>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Order by" />
            </SelectTrigger>
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
