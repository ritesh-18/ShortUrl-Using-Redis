import { initTRPC } from "@trpc/server";

const t=initTRPC.create();
export const appRouter=t.router
export const appProcedure=t.procedure;