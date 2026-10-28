import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  recordVisit,
  visitsConfigured,
  VISITOR_COOKIE,
} from "@/lib/visits";

export async function POST() {
  if (!visitsConfigured()) {
    return NextResponse.json({ recorded: false }, { status: 204 });
  }

  const jar = await cookies();
  let visitorId = jar.get(VISITOR_COOKIE)?.value;
  if (!visitorId) {
    visitorId = crypto.randomUUID();
    jar.set(VISITOR_COOKIE, visitorId, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });
  }

  const result = await recordVisit(visitorId);
  return NextResponse.json(result);
}
