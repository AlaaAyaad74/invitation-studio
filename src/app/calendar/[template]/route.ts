import { botanicalInvitation } from "@/data/botanical";
import { couples } from "@/data/couples";
import { elegantInvitation } from "@/data/elegant";
import {
  androidCalendarUrl,
  eventFromInvite,
  toIcs,
  type CalendarEvent,
} from "@/lib/calendar";

const events: Record<string, CalendarEvent> = {
  botanical: eventFromInvite("botanical", botanicalInvitation),
  elegant: eventFromInvite("elegant", elegantInvitation),
  ...Object.fromEntries(
    couples.map((couple) => [
      couple.calendarId,
      eventFromInvite(couple.calendarId, couple),
    ]),
  ),
};

export async function GET(
  request: Request,
  context: { params: Promise<{ template: string }> },
) {
  const { template } = await context.params;
  const event = events[template];
  if (!event) {
    return new Response("Calendar event not found", { status: 404 });
  }

  const open = new URL(request.url).searchParams.get("open");
  if (open === "android") {
    return Response.redirect(androidCalendarUrl(event), 302);
  }

  return new Response(toIcs(event), {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `inline; filename="${template}-wedding.ics"`,
      "Cache-Control": "no-cache",
    },
  });
}
