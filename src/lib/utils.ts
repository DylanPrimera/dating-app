import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { differenceInYears } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function calculateAge(birthDate: Date) {
  return differenceInYears(new Date(), birthDate)
}