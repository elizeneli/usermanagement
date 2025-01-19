import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import { createNextApiHandler } from "@trpc/server/adapters/next";
import { appRouter } from "./router";

export const createContext = () => {
  return {};
};

export type Context = inferAsyncReturnType<typeof createContext>;

export const trpc = initTRPC.context<Context>().create();

export const handler = createNextApiHandler({
  router: appRouter,
  createContext,
});
