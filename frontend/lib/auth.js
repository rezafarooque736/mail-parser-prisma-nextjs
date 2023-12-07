import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcrypt";
import { db } from "./db";

export const authOptions = {
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "sample@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          // confirm data exists
          if (!credentials?.email || !credentials?.password) return null;

          const existingUser = await db.user.findUnique({
            where: { email: credentials?.email },
          });

          if (!existingUser) return null;

          // check if password is valid
          const isPasswordValid = await compare(
            credentials?.password,
            existingUser?.password
          );

          if (!isPasswordValid) return null;

          // return user data if valid
          return {
            id: existingUser.id.toString(),
            name: existingUser.name,
            email: existingUser.email,
            role: existingUser.role,
          };
        } catch (err) {
          console.log(err.message);
          throw new Error(err);
        }
      },
    }),
  ],
  callbacks: {
    // role based access control #persisting-the-role
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          name: user.name,
          role: user.role,
        };
      }
      return token;
    },
    // if you want to use the role in client component
    async session({ session, token }) {
      if (session?.user) {
        return {
          ...session,
          user: {
            ...session.user,
            name: token.name,
            role: token.role,
          },
        };
      }
      return session;
    },
  },
};
