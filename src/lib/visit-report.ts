import { Resend } from "resend";
import { siteConfig } from "@/lib/site";
import {
  formatReportDate,
  getVisitTotals,
  mailConfigured,
  reportEmail,
} from "@/lib/visits";

export async function sendDailyVisitReport(date: string) {
  if (!mailConfigured()) {
    throw new Error("RESEND_API_KEY is not set");
  }

  const totals = await getVisitTotals(date);
  const when = formatReportDate(date);
  const to = reportEmail();
  const resend = new Resend(process.env.RESEND_API_KEY);
  const from =
    process.env.REPORT_FROM_EMAIL ?? "Invitation Studio <beth.t@example.com>";

  const { error } = await resend.emails.send({
    from,
    to,
    subject: `${siteConfig.name}: ${totals.visitors} visitors on ${when}`,
    text: [
      `${siteConfig.name} daily visits`,
      when,
      "",
      `Unique visitors: ${totals.visitors}`,
      `Page views: ${totals.views}`,
      "",
      "This is the traffic recorded on your invitation website for that day.",
    ].join("\n"),
    html: `<div style="font-family:Georgia,serif;background:#f7f3ee;color:#2a2623;padding:32px">
  <div style="max-width:480px;margin:0 auto;background:#fffcf8;padding:28px 24px;border:1px solid #efe8df">
    <p style="margin:0 0 8px;letter-spacing:.18em;text-transform:uppercase;font-size:12px;color:#b76e79">Daily visits</p>
    <h1 style="margin:0 0 20px;font-size:28px;font-weight:500">${siteConfig.name}</h1>
    <p style="margin:0 0 20px;color:#6b635c">${when}</p>
    <p style="margin:0 0 8px;font-size:22px"><strong>${totals.visitors}</strong> unique visitors</p>
    <p style="margin:0 0 24px;font-size:18px"><strong>${totals.views}</strong> page views</p>
    <p style="margin:0;color:#6b635c;font-size:14px">Traffic recorded on your invitation website for that day.</p>
  </div>
</div>`,
  });

  if (error) {
    throw new Error(error.message);
  }

  return { to, ...totals };
}
