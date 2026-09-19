export const siteConfig = {
  name: "Invitation Studio",
  tagline: "Invitation websites that feel like the day itself.",
  description:
    "Browse wedding invitation website templates, then make them yours—or commission custom couple logos and bespoke invitation sites.",
  email: "hello@vowcraft.studio",
  keywords: [
    "wedding invitation websites",
    "digital wedding invitations",
    "online wedding invitations",
    "custom couple logo",
    "bespoke invitation site",
    "wedding RSVP website",
    "Invitation Studio",
  ],
} as const;

export function getSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "http://localhost:3000";
}
