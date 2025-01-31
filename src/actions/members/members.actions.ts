"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { FiltersParams, PaginatedResponse } from "@/types";
import { Member, Photo } from "@prisma/client";
import { getAuthUserId } from "../auth/auth.actions";
import { getAgeRange } from "@/lib";

export const getMembers = async ({
  ageRange = "18,45",
  gender = "male,female",
  orderBy = "updated",
  page = "1",
  pageSize = "12",
  withPhoto = "true",
}: FiltersParams): Promise<PaginatedResponse<Member>> => {
  const userId = await getAuthUserId();
  const [minDob, maxDob] = getAgeRange(ageRange);
  let selectedGender;
  const pageNumber = parseInt(page);
  const limit = parseInt(pageSize);
  const skip = (pageNumber - 1) * limit;
  if(gender.includes('') && gender.length===0) {
    selectedGender = ['male', 'female'];
  } else {
    selectedGender = gender.split(',');
  }
  try {
    const membersSelection = {
      where: {
        AND: [
          {
            dateOfBirth: { gte: minDob },
          },
          {
            dateOfBirth: { lte: maxDob },
          },
          {
            gender: { in: selectedGender },
          },
          ...(withPhoto === "true" ? [{ image: { not: null } }] : []),
        ],
        NOT: {
          userId,
        },
      },
    };

    const count = await prisma.member.count(membersSelection);

    const members = await prisma.member.findMany({
      ...membersSelection,
      orderBy: { [orderBy]: "desc" },
      skip,
      take: limit,
    });

    return { items: members, totalCount: count };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getMemberById = async (id: string) => {
  const session = await auth();
  if (!session?.user) return null;
  try {
    const member = await prisma.member.findUnique({
      where: {
        userId: id,
      },
    });
    return member;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getMemberPhotos = async (userId: string) => {
  const member = await prisma.member.findUnique({
    where: {
      userId,
    },
    select: {
      photos: true,
    },
  });
  if (!member) return null;

  return member.photos.map((p) => p) as Photo[];
};

export const updateLastActive = async () => {
  const userId = await getAuthUserId();

  try {
    return prisma.member.update({
      where: { userId },
      data: { updated: new Date() },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
