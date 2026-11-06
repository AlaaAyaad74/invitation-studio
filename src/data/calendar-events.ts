import { botanicalInvitation } from "@/data/botanical";
import { coastalLightInvitation } from "@/data/coastal-light";
import { couples } from "@/data/couples";
import { customCoupleEvent, customCouples } from "@/data/custom-couples/couples";
import { desertBloomEvent } from "@/data/desert-bloom";
import { elegantInvitation } from "@/data/elegant";
import { heritageEvent } from "@/data/heritage-script";
import { eventFromInvite, type CalendarEvent } from "@/lib/calendar";

/**
 * Every invitation's calendar event, keyed by the id used in
 * /calendar/<id>. Add new templates and couples here.
 */
const allEvents: CalendarEvent[] = [
  eventFromInvite("botanical", botanicalInvitation),
  eventFromInvite("elegant", elegantInvitation),
  eventFromInvite("coastal-light", coastalLightInvitation),
  heritageEvent,
  desertBloomEvent,
  ...couples.map((couple) => eventFromInvite(couple.calendarId, couple)),
  ...customCouples.map(customCoupleEvent),
];

export const calendarEvents: Record<string, CalendarEvent> = Object.fromEntries(
  allEvents.map((event) => [event.id, event]),
);
