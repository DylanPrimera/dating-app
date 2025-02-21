"use server";

import { type EditMemberSchema, editMemberSchema } from "@/lib";
import prisma from "@/lib/prisma";
import type { ActionResult } from "@/types";
import type { Member, Photo } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { deleteImageFromCloudinary } from "..";
import { getAuthUserId } from "../auth/auth.actions";

export const getUserByEmail = async (email: string) => {
	const user = await prisma.user.findUnique({
		where: {
			email: email.toLocaleLowerCase(),
		},
	});

	return user;
};

export const updateMemberProfile = async (
	data: EditMemberSchema,
	nameUpdated: boolean,
): Promise<ActionResult<Member>> => {
	try {
		const userId = await getAuthUserId();
		const validated = editMemberSchema.safeParse(data);
		if (!validated.success)
			return { status: "error", error: validated.error.message };

		const { name, description, city, country } = validated.data;

		if (nameUpdated) {
			await prisma.user.update({
				where: {
					id: userId,
				},
				data: {
					name,
				},
			});
		}

		const member = await prisma.member.update({
			where: {
				userId,
			},
			data: {
				name,
				description,
				city,
				country,
			},
		});
		revalidatePath("/");
		revalidatePath("/members/edit");
		return { status: "success", data: member };
	} catch (error) {
		console.log(error);
		return { status: "error", error: "Something went wrong" };
	}
};

export const addImage = async (url: string, publicId: string) => {
	try {
		const userId = await getAuthUserId();
		return prisma.member.update({
			where: {
				userId,
			},
			data: {
				photos: {
					create: {
						url,
						publicId,
					},
				},
			},
		});
	} catch (error) {
		console.log("error");
		throw error;
	}
};

export const setMainImage = async (photo: Photo) => {
	try {
		if (!photo.isApproved)
			throw new Error("Only approved photos can be set to main image");
		const userId = await getAuthUserId();
		await prisma.user.update({
			where: { id: userId },
			data: { image: photo.url },
		});

		return prisma.member.update({
			where: { userId },
			data: { image: photo.url },
		});
	} catch (error) {
		console.log("error");
		throw error;
	}
};

export const deleteImage = async (photo: Photo) => {
	try {
		const userId = await getAuthUserId();
		if (photo.publicId) {
			await deleteImageFromCloudinary(photo.publicId);
		}

		return prisma.member.update({
			where: { userId },
			data: {
				photos: {
					delete: {
						id: photo.id,
					},
				},
			},
		});
	} catch (error) {
		console.log("error");
		throw error;
	}
};

export const getUserInfoForNav = async () => {
	try {
		const userId = await getAuthUserId();
		return prisma.user.findUnique({
			where: {
				id: userId,
			},
			select: { name: true, image: true },
		});
	} catch (error) {
		console.log(error);
		throw error;
	}
};
