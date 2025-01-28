"use server";
import prisma from "@/lib/prisma";
import { getAuthUserId } from "../auth/auth.actions";
import { pusherServer } from "@/lib";

export const toggleLikeMember = async (
  targetUserId: string,
  isLiked: boolean
) => {
  try {
    const userId = await getAuthUserId();
    if (isLiked) {
      await prisma.like.delete({
        where: {
          sourceUserId_targetUserId: {
            sourceUserId: userId,
            targetUserId,
          },
        },
      });
      return;
    }
    const like = await prisma.like.create({
      data: {
        sourceUserId: userId,
        targetUserId,
      },
      select: {
        sourceMember: {
          select: {
            name: true,
            image: true,
            userId: true
          }
        }
      }
    });
    await pusherServer.trigger(`private-${targetUserId}`,'like:new', {
      name: like.sourceMember.name,
      image: like.sourceMember.image,
      userId: like.sourceMember.userId
    })

  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getCurrentUserLikeIds = async () => {
  try {
    const userId = await getAuthUserId();
    const likeIds = await prisma.like.findMany({
      where: {
        sourceUserId: userId,
      },
      select: {
        targetUserId: true,
      },
    });
    return likeIds.map((like) => like.targetUserId);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getLikedMembers = async (type = "source") => {
  try {
    const userId = await getAuthUserId();
    switch (type) {
      case "source":
        return await getSourceLikes(userId);
      case "target":
        return await getTargetLikes(userId);
      case "mutual":
        return await getMutualLikes(userId);
      default:
        return [];
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getSourceLikes = async (userId: string) => {
  const sourceList = await prisma.like.findMany({
    where: {
      sourceUserId: userId,
    },
    select: {
      targetMember: true,
    },
  });
  return sourceList.map((like) => like.targetMember);
};

const getTargetLikes = async (userId: string) => {
  const targetList = await prisma.like.findMany({
    where: {
      targetUserId: userId,
    },
    select: {
      sourceMember: true,
    },
  });
  return targetList.map((like) => like.sourceMember);
};

const getMutualLikes = async (userId: string) => {
  const likedIds = await getCurrentUserLikeIds();
  const mutualList = await prisma.like.findMany({
    where: {
      AND: [{ targetUserId: userId }, { sourceUserId: { in: likedIds } }],
    },
    select: { sourceMember: true },
  });

  return mutualList.map((m) => m.sourceMember);
};
