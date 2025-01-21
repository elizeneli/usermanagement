import { initTRPC } from "@trpc/server";
import { PrismaClient } from "@prisma/client";
import superjson from "superjson";
import { z } from "zod";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();
const t = initTRPC.create({
  transformer: superjson,
});
export const appRouter = t.router({
  getUser: t.procedure.input(z.number()).query(async (opts) => {
    const user = await prisma.user.findUnique({
      where: { id: opts.input },
    });
    if (!user) throw new Error("User not found");
    return user;
  }),

  getUsers: t.procedure.query(async () => {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    console.log("useeeers", users);
    return users;
  }),

  createUser: t.procedure
    .input(
      z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string(),
      })
    )
    .mutation(async (opts) => {
      const { name, email, password } = opts.input;

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });
      return newUser;
    }),

  updateUser: t.procedure
    .input(
      z.object({
        id: z.number(),
        name: z.string().optional(),
        email: z.string().email().optional(),
        password: z.string().optional(),
      })
    )
    .mutation(async (opts) => {
      const { id, name, email, password } = opts.input;

      const hashedPassword = password
        ? await bcrypt.hash(password, 10)
        : undefined;

      const updatedUser = await prisma.user.update({
        where: { id },
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });
      return updatedUser;
    }),

  deleteUser: t.procedure.input(z.number()).mutation(async (opts) => {
    const deletedUser = await prisma.user.delete({
      where: { id: opts.input },
    });
    return deletedUser;
  }),

  loginUser: t.procedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
      })
    )
    .mutation(async (opts) => {
      const { email, password } = opts.input;

      const user = await prisma.user.findUnique({
        where: { email },
      });
      if (!user) throw new Error("Invalid credentials");

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) throw new Error("Invalid credentials");

      return user;
    }),

  checkAdmin: t.procedure.input(z.number()).query(async (opts) => {
    const user = await prisma.user.findUnique({
      where: { id: opts.input },
    });
    if (!user) throw new Error("User not found");
    return user.role === "admin";
  }),
});

export type AppRouter = typeof appRouter;
