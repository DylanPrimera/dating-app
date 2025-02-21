import { z } from "zod";

export const editMemberSchema = z.object({
	name: z.string().min(1, "Name is required"),
	description: z.string().min(1, "Description is required"),
	city: z.string().min(1, "City is required"),
	country: z.string().min(1, "Country is required"),
});

export type EditMemberSchema = z.infer<typeof editMemberSchema>;
