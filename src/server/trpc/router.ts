import { initTRPC } from "@trpc/server";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();
const t = initTRPC.create();

export const appRouter = t.router({
  // Fetch a single user by ID
  getUser: t.procedure.input(z.number()).query(async (opts) => {
    const user = await prisma.user.findUnique({
      where: { id: opts.input },
    });
    return user;
  }),

  // Fetch all users
  getUsers: t.procedure.query(async () => {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    return users;
  }),

  // Create a new user
  createUser: t.procedure
    .input(
      z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string(), // Add password field
      })
    )
    .mutation(async (opts) => {
      const newUser = await prisma.user.create({
        data: opts.input,
      });
      return newUser;
    }),
});

export type AppRouter = typeof appRouter;
