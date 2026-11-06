import { calendarEvents as events } from "@/data/calendar-events";
import { androidCalendarUrl, toIcs, type CalendarEvent } from "@/lib/calendar";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function androidLandingPage(event: CalendarEvent) {
  const intent = androidCalendarUrl(event);

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>${escapeHtml(event.title)}</title>
<style>
  body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;
    font-family:system-ui,-apple-system,sans-serif;background:#f6f3ee;color:#1f1f1f;padding:24px;box-sizing:border-box}
  main{max-width:420px;width:100%;background:#fff;border-radius:20px;padding:28px;text-align:center;
    box-shadow:0 10px 30px rgba(0,0,0,.08)}
  h1{font-size:20px;margin:0 0 8px}
  p{margin:0 0 6px;color:#555;font-size:14px;line-height:1.5}
  a{display:block;margin-top:20px;padding:14px;border-radius:999px;background:#1f1f1f;color:#fff;
    text-decoration:none;font-weight:600;font-size:16px}
</style>
</head>
<body>
<main>
  <h1>${escapeHtml(event.title)}</h1>
  <p id="date"></p>
  <p>${escapeHtml(event.location)}</p>
  <a id="add" href="${escapeHtml(intent)}">Add to calendar</a>
</main>
<script>
  var start = new Date(${JSON.stringify(event.start)});
  document.getElementById("date").textContent = start.toLocaleString(undefined, { dateStyle: "full", timeStyle: "short" });
  window.location.href = document.getElementById("add").href;
</script>
</body>
</html>`;
}

export async function GET(
  request: Request,
  context: { params: Promise<{ template: string }> },
) {
  const { template: raw } = await context.params;
  // iOS Safari opens the Calendar sheet most reliably for URLs ending in .ics.
  const template = raw.replace(/\.ics$/i, "");
  const event = events[template];
  if (!event) {
    return new Response("Calendar event not found", { status: 404 });
  }

  const open = new URL(request.url).searchParams.get("open");
  if (open === "android") {
    return Response.redirect(androidCalendarUrl(event), 302);
  }

  // Opened in Chrome from an in-app browser (Instagram, ...). Chrome may block
  // the automatic jump to the calendar app, so also show one-tap button.
  if (open === "android-page") {
    return new Response(androidLandingPage(event), {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  }

  return new Response(toIcs(event), {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `inline; filename="${template}-wedding.ics"`,
      "Cache-Control": "no-cache",
    },
  });
}
