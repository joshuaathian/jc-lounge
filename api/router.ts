import { createRouter, publicQuery } from "./middleware";
import { reservationRouter } from "./reservationRouter";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  reservation: reservationRouter,
});

export type AppRouter = typeof appRouter;
