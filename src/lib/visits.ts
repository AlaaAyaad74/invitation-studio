import { Redis } from "@upstash/redis";

export const VISITOR_COOKIE = "vs_vid";
export const REPORT_TIMEZONE = "Africa/Cairo";

type VisitTotals = {
  date: string;
  views: number;
  visitors: number;
};

function redis() {
  const url =
    process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
  const token =
    process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

export function visitsConfigured() {
  return Boolean(
    (process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL) &&
      (process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN),
  );
}

export function mailConfigured() {
  return Boolean(process.env.RESEND_API_KEY);
}

export function reportEmail() {
  return process.env.REPORT_EMAIL ?? "alaaayad32@gmail.com";
}

export function dateKey(at = new Date(), timeZone = REPORT_TIMEZONE) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(at);
}

export function previousDateKey(at = new Date(), timeZone = REPORT_TIMEZONE) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(at);
  const year = Number(parts.find((part) => part.type === "year")?.value);
  const month = Number(parts.find((part) => part.type === "month")?.value);
  const day = Number(parts.find((part) => part.type === "day")?.value);
  const local = new Date(Date.UTC(year, month - 1, day));
  local.setUTCDate(local.getUTCDate() - 1);
  return dateKey(local, "UTC");
}

function viewsKey(date: string) {
  return `visits:${date}:views`;
}

function visitorsKey(date: string) {
  return `visits:${date}:visitors`;
}

export async function recordVisit(visitorId: string) {
  const client = redis();
  if (!client) return { recorded: false as const };

  const date = dateKey();
  await Promise.all([
    client.incr(viewsKey(date)),
    client.pfadd(visitorsKey(date), visitorId),
    client.expire(viewsKey(date), 60 * 60 * 24 * 90),
    client.expire(visitorsKey(date), 60 * 60 * 24 * 90),
  ]);

  return { recorded: true as const, date };
}

export async function getVisitTotals(date: string): Promise<VisitTotals> {
  const client = redis();
  if (!client) {
    return { date, views: 0, visitors: 0 };
  }

  const [views, visitors] = await Promise.all([
    client.get<number>(viewsKey(date)),
    client.pfcount(visitorsKey(date)),
  ]);

  return {
    date,
    views: Number(views ?? 0),
    visitors: Number(visitors ?? 0),
  };
}

export function formatReportDate(date: string) {
  const [year, month, day] = date.split("-").map(Number);
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(Date.UTC(year, month - 1, day)));
}
