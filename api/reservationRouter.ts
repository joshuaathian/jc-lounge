import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createRouter, publicQuery } from "./middleware";
import { createReservation } from "./queries/reservations";

// Simple in-memory rate limiter: max 5 reservation requests per IP per 10 minutes.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const hits = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string) {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || entry.resetAt < now) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return;
  }
  entry.count += 1;
  if (entry.count > MAX_REQUESTS) {
    throw new TRPCError({
      code: "TOO_MANY_REQUESTS",
      message: "Too many reservation requests. Please try again later.",
    });
  }
}

const PHONE_RE = /^[+0-9][0-9\s()-]{6,24}$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const TIME_RE = /^([01]\d|2[0-3]):[0-5]\d$/;

export const reservationRouter = createRouter({
  create: publicQuery
    .input(
      z.object({
        name: z.string().trim().min(2, "Please enter your name").max(120),
        phone: z
          .string()
          .trim()
          .regex(PHONE_RE, "Please enter a valid phone or WhatsApp number"),
        date: z.string().regex(DATE_RE, "Please choose a date"),
        time: z.string().regex(TIME_RE, "Please choose a time"),
        partySize: z.number().int().min(1).max(40),
        notes: z.string().trim().max(600).optional(),
        consent: z
          .boolean()
          .refine((v) => v === true, "Please accept so we can contact you"),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const ip =
        ctx.req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
        "unknown";
      checkRateLimit(ip);

      // Reject past dates server-side as well.
      const today = new Date();
      const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
      if (input.date < todayStr) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Please choose a date in the future.",
        });
      }

      const { id } = await createReservation(input);
      return { ok: true as const, id };
    }),
});
