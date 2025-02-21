import { randomBytes } from "node:crypto";
import type { TokenType } from "@prisma/client";
import prisma from "./prisma";

export async function getTokenByEmail(email: string) {
	return prisma.token.findFirst({
		where: {
			email,
		},
	});
}

export async function getTokenByToken(token: string) {
	return prisma.token.findFirst({
		where: {
			token,
		},
	});
}

export async function generateToken(email: string, type: TokenType) {
	const token = randomBytes(48).toString("hex");
	const expires = new Date(new Date().getTime() + 1000 * 60 * 60 * 24); // 24hrs

	const existingToken = await getTokenByEmail(email);
	if (existingToken) {
		await prisma.token.delete({
			where: { id: existingToken.id },
		});
	}

	return prisma.token.create({
		data: {
			email,
			token,
			expires,
			type,
		},
	});
}
