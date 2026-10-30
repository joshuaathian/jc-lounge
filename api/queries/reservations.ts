import { getDb } from "./connection";
import { reservations } from "@db/schema";

export type NewReservation = {
  name: string;
  phone: string;
  date: string;
  time: string;
  partySize: number;
  notes?: string;
  consent: boolean;
};

export async function createReservation(data: NewReservation) {
  const db = getDb();
  const result = await db.insert(reservations).values({
    name: data.name,
    phone: data.phone,
    date: data.date,
    time: data.time,
    partySize: data.partySize,
    notes: data.notes ?? null,
    consent: data.consent,
  });
  return { id: Number(result[0].insertId) };
}
