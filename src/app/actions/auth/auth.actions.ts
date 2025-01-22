"use server";

import { signIn, signOut } from "@/auth";
import { LoginSchema, registerSchema, RegisterSchema } from "@/lib";
import prisma from "@/lib/prisma";
import { ActionResult } from "@/types";
import bcrypt from "bcryptjs";
import { AuthError, User } from "next-auth";

export const signInUser = async (
  data: LoginSchema
): Promise<ActionResult<string>> => {
  try {
    const userExists = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!userExists) {
      return { status: "error", error: "User doesn't exists" };
    }
    await signIn("credentials", { ...data, redirect: false });

    return { status: "success", data: "Logged in" };
  } catch (error) {
    console.log(error);
    if (error instanceof AuthError) {
      switch (error?.type) {
        case "CredentialsSignin":
          return { status: "error", error: "Invalid credentials" };
        default:
          return { status: "error", error: "Something went wrong" };
      }
    } else {
      return { status: "error", error: "Something went wrong" };
    }
  }
};

export const signOutUser = async () => {
  await signOut({ redirectTo: "/login" });
};

export const registerUser = async (
  data: RegisterSchema
): Promise<ActionResult<User>> => {
  try {
    const validated = registerSchema.safeParse(data);

    if (!validated.success) {
      return { status: "error", error: validated.error.errors };
    }

    const { name, email, password } = validated.data;

    const hashedPassword = bcrypt.hashSync(password, 10);

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) return { status: "error", error: "User already exists" };

    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash: hashedPassword,
      },
    });

    return { status: "success", data: user };
  } catch (error) {
    console.log(error);
    return { status: "error", error: "Something went wrong" };
  }
};
