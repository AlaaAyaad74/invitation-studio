import { NextResponse } from "next/server";
import { sendDailyVisitReport } from "@/lib/visit-report";
import { previousDateKey, visitsConfigured } from "@/lib/visits";

function authorized(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  const header = request.headers.get("authorization");
  return header === `Bearer ${secret}`;
}

export async function GET(request: Request) {
  if (!authorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!visitsConfigured()) {
    return NextResponse.json(
      { error: "Visit storage is not configured" },
      { status: 503 },
    );
  }

  const date = previousDateKey();
  const report = await sendDailyVisitReport(date);
  return NextResponse.json({ ok: true, report });
}
