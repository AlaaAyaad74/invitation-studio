import { botanicalInvitation, botanicalInvitationAr } from "@/data/botanical";
import { coastalLightInvitations } from "@/data/coastal-light";
import { couples } from "@/data/couples";
import { customCoupleEvent, customCouples } from "@/data/custom-couples/couples";
import { desertBloomEvent, desertBloomInvitations } from "@/data/desert-bloom";
import { elegantInvitations } from "@/data/elegant";
import { heritageEvent, heritageInvitations } from "@/data/heritage-script";
import { LANGS } from "@/lib/i18n";
import { eventFromInvite, type CalendarEvent } from "@/lib/calendar";

/**
 * Every invitation's calendar event, keyed by the id used in
 * /calendar/<id>. Add new templates and couples here.
 */
const allEvents: CalendarEvent[] = [
  eventFromInvite("botanical", botanicalInvitation),
  eventFromInvite(botanicalInvitationAr.calendarId ?? "botanical-ar", botanicalInvitationAr),
  ...LANGS.flatMap((lang) => [
    eventFromInvite(elegantInvitations[lang].calendarId, elegantInvitations[lang]),
    eventFromInvite(coastalLightInvitations[lang].calendarId, coastalLightInvitations[lang]),
    heritageEvent(heritageInvitations[lang]),
    desertBloomEvent(desertBloomInvitations[lang]),
  ]),
  ...couples.map((couple) => eventFromInvite(couple.calendarId, couple)),
  ...customCouples.map(customCoupleEvent),
];

export const calendarEvents: Record<string, CalendarEvent> = Object.fromEntries(
  allEvents.map((event) => [event.id, event]),
);
