export type CalendarEvent = {
  id: string;
  title: string;
  start: string;
  end: string;
  location: string;
  details: string;
};

type InviteCalendar = {
  couple: { first: string; second: string };
  intro: string;
  tagline: string;
  start: string;
  end: string;
  venue: { name: string; address?: string };
};

export function eventFromInvite(id: string, data: InviteCalendar): CalendarEvent {
  const location = data.venue.address
    ? `${data.venue.name}, ${data.venue.address}`
    : data.venue.name;

  return {
    id,
    title: `${data.couple.first} & ${data.couple.second} — Wedding`,
    start: data.start,
    end: data.end,
    location,
    details: `${data.intro} ${data.tagline}.`,
  };
}

function toCalendarStamp(iso: string) {
  return new Date(iso).toISOString().replace(/[-:]|\.\d{3}/g, "");
}

export function googleCalendarUrl(event: CalendarEvent) {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: `${toCalendarStamp(event.start)}/${toCalendarStamp(event.end)}`,
    location: event.location,
    details: event.details,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function intentValue(value: string) {
  return encodeURIComponent(value);
}

export function androidCalendarUrl(event: CalendarEvent) {
  const start = new Date(event.start).getTime();
  const end = new Date(event.end).getTime();
  const fallback = encodeURIComponent(googleCalendarUrl(event));

  return [
    "intent://insert#Intent",
    "action=android.intent.action.INSERT",
    "type=vnd.android.cursor.item/event",
    `S.title=${intentValue(event.title)}`,
    `S.description=${intentValue(event.details)}`,
    `S.eventLocation=${intentValue(event.location)}`,
    `l.beginTime=${start}`,
    `l.endTime=${end}`,
    `S.browser_fallback_url=${fallback}`,
    "end",
  ].join(";");
}

function escapeIcs(value: string) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\r?\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

function foldIcs(line: string) {
  if (line.length <= 75) return line;
  const parts = [line.slice(0, 75)];
  let rest = line.slice(75);
  while (rest.length > 0) {
    parts.push(` ${rest.slice(0, 74)}`);
    rest = rest.slice(74);
  }
  return parts.join("\r\n");
}

export function toIcs(event: CalendarEvent) {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Invitation Studio//Wedding//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${event.id}-wedding@invitation.studio`,
    `DTSTAMP:${toCalendarStamp(new Date().toISOString())}`,
    `DTSTART:${toCalendarStamp(event.start)}`,
    `DTEND:${toCalendarStamp(event.end)}`,
    `SUMMARY:${escapeIcs(event.title)}`,
    `LOCATION:${escapeIcs(event.location)}`,
    `DESCRIPTION:${escapeIcs(event.details)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  return `${lines.map(foldIcs).join("\r\n")}\r\n`;
}
