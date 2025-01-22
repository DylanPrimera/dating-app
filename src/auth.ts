import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./lib/prisma";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "./lib";
import brcyptjs from "bcryptjs";
import { getUserByEmail } from "./app/actions";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      name: "credentials",
      async authorize(creds) {
        const validated = loginSchema.safeParse(creds);
        if (validated.success) {
          const { email, password } = validated.data;

          const user = await getUserByEmail(email);

          if (!user || !brcyptjs.compareSync(password, user.passwordHash!)) {
            return null;
          }

          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { passwordHash: _, ...userWithoutPassword } = user;
          return userWithoutPassword;
        }

        return null;
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token }) {
      return token;
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub as string;
      }

      return session;
    },
  },
});
