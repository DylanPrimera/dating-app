"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { Photo } from "@prisma/client";

export const getMembers = async () => {
  const session = await auth();
  if (!session?.user) return null;
  try {
    const members = await prisma.member.findMany({
      where: {
        NOT: {
          userId: session.user.id,
        },
      },
    });

    return members;
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
  if(!member) return null;

  return member.photos.map(p => p) as Photo[];
};
