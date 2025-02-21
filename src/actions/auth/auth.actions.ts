"use server";

import { auth, signIn, signOut } from "@/auth";
import {
	type LoginSchema,
	type RegisterSchema,
	generateToken,
	getTokenByToken,
	registerSchema,
	resetPassword,
	sendVerificationEmail,
} from "@/lib";
import prisma from "@/lib/prisma";
import type { ActionResult } from "@/types";
import { TokenType } from "@prisma/client";
import bcrypt from "bcryptjs";
import { AuthError, type User } from "next-auth";
import { combinedRegisterSchema } from "../../lib/schemas/RegisterSchema";
import { getUserByEmail } from "../user/user.actions";

export const signInUser = async (
	data: LoginSchema,
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
		if (!userExists.emailVerified) {
			const { token, email } = await generateToken(
				userExists.email ?? "",
				TokenType.VERIFICATION,
			);

			await sendVerificationEmail(email, token);
			return {
				status: "error",
				error: "Please verify your email before loggin in",
			};
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
			// biome-ignore lint/style/noUselessElse: <explanation>
		} else {
			return { status: "error", error: "Something went wrong" };
		}
	}
};

export const signOutUser = async () => {
	await signOut({ redirectTo: "/login" });
};

export const registerUser = async (
	data: RegisterSchema,
): Promise<ActionResult<User>> => {
	try {
		const validated = combinedRegisterSchema.safeParse(data);

		if (!validated.success) {
			return { status: "error", error: validated.error.errors };
		}

		const {
			name,
			email,
			password,
			gender,
			description,
			dateOfBirth,
			city,
			country,
		} = validated.data;

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
				member: {
					create: {
						name,
						description,
						city,
						country,
						dateOfBirth: new Date(dateOfBirth),
						gender,
					},
				},
			},
		});

		const { token, email: registerEmail } = await generateToken(
			email,
			TokenType.VERIFICATION,
		);

		await sendVerificationEmail(registerEmail, token);
		return { status: "success", data: user };
	} catch (error) {
		console.log(error);
		return { status: "error", error: "Something went wrong" };
	}
};

export const verifyEmail = async (
	token: string,
): Promise<ActionResult<string>> => {
	const existingToken = await getTokenByToken(token);

	if (!existingToken) {
		return { status: "error", error: "Invalid token" };
	}

	const hasExpired = new Date() > existingToken.expires;

	if (hasExpired) {
		return { status: "error", error: "Token has expired" };
	}

	const existingUser = await getUserByEmail(existingToken.email);

	if (!existingUser) {
		return { status: "error", error: "User not found" };
	}

	await prisma.user.update({
		where: { id: existingUser.id },
		data: { emailVerified: new Date() },
	});

	await prisma.token.delete({ where: { id: existingToken.id } });

	return { status: "success", data: "Email verified" };
};

export const generateResetPasswordEmail = async (
	email: string,
): Promise<ActionResult<string>> => {
	const existingUser = await getUserByEmail(email);

	if (!existingUser) {
		return { status: "error", error: "User not found" };
	}

	const { token, email: TokenEmail } = await generateToken(
		email,
		TokenType.PASSWORD_RESET,
	);

	await resetPassword(TokenEmail, token);
	return { status: "success", data: "Email sent" };
};

export const getAuthUserId = async () => {
	const session = await auth();
	const userId = session?.user?.id;
	if (!userId) throw new Error("User not authenticated");

	return userId;
};

export const getUserRole = async () => {
	const session = await auth();

	const role = session?.user.role;

	if (!role) throw new Error("Not in role");

	return role;
};
