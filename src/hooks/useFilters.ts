import { usePathname, useRouter} from "next/navigation";
import { useFilterStore } from "./useFiltersStore";
import { ChangeEvent, useEffect } from "react";
import { FaFemale, FaMale } from "react-icons/fa";

export const useFilters = () => {
  const pathname = usePathname();
  const router = useRouter();

  const { filters, setFilters } = useFilterStore();
  const { gender, ageRange, orderBy, withPhoto } = filters;

  useEffect(() => {
    const searchParams = new URLSearchParams();

    if (gender) searchParams.set("gender", gender.join(","));
    if (ageRange) searchParams.set("ageRange", ageRange.join(","));
    if (orderBy) searchParams.set("orderBy", orderBy);
    if (withPhoto) searchParams.set("withPhoto", withPhoto.toString());

    router.replace(`${pathname}?${searchParams.toString()}`);
  }, [ageRange, orderBy, gender, router, pathname, withPhoto]);

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

  const handleGenderSelect = (value: string) => {
    if (gender.includes(value)) {
      setFilters(
        "gender",
        gender.filter((g) => g !== value)
      );
    } else {
      setFilters("gender", [...gender, value]);
    }
  };

  const handleAgeSelect = (values: number[]) => {
    setFilters("ageRange", values);
  };

  const handleOrderBy = (value: string) => {
    setFilters("orderBy", value);
  };

  const handleWithPhotoToggle = (e: ChangeEvent<HTMLInputElement>) => {
    setFilters("withPhoto", e.target.checked);
  };

  return  {
    orderByList,
    genderList,
    selectAge: handleAgeSelect,
    selectGender: handleGenderSelect,
    selectOrder: handleOrderBy,
    selectWithPhoto: handleWithPhotoToggle,
    filters
  }
};
