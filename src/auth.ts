import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient, type Role } from "@prisma/client";
import NextAuth from "next-auth";
import type { Adapter } from "next-auth/adapters";
import authConfig from "./auth.config";

const prisma = new PrismaClient();

export const { handlers, signIn, signOut, auth } = NextAuth({
	callbacks: {
		async jwt({ token, user, trigger, session }) {
			if (user) {
				token.profileComplete = user.profileComplete;
				token.role = user.role as Role;
			}
			if (trigger === "update" && session?.name) {
				token.name = session.name;
			}
			return token;
		},
		async session({ session, token }) {
			if (token.sub && session.user) {
				session.user.id = token.sub as string;
				session.user.profileComplete = token.profileComplete as boolean;
				session.user.role = token.role as Role;
			}
			return session;
		},
	},
	adapter: PrismaAdapter(prisma) as Adapter,
	session: { strategy: "jwt" },
	...authConfig,
});
