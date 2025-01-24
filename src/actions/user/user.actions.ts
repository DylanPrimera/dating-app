"use server";

import { editMemberSchema, EditMemberSchema } from "@/lib";
import prisma from "@/lib/prisma";
import { ActionResult } from "@/types";
import { Member } from "@prisma/client";
import { getAuthUserId } from "../auth/auth.actions";
import { revalidatePath } from "next/cache";

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
  nameUpdated: boolean
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
    revalidatePath('/');
    revalidatePath('/members/edit');
    return { status: "success", data: member };
  } catch (error) {
    console.log(error);
    return { status: "error", error: "Something went wrong" };
  }
};
