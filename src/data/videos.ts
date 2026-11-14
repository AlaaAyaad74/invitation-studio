import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";

export type InvitationVideo = {
  id: string;
  title: string;
  src: string;
  /** Still shown on the card until the first play. */
  poster?: string;
  /** Frame shape (width / height), so each card matches its film. */
  aspect: number;
};

const VIDEO_DIR = path.join(process.cwd(), "public", "videos", "compressed");

const hiddenVideos = new Set([
  "WhatsApp_Video_2026-10-17_at_8_07_18_PM.mp4",
  "WhatsApp_Video_2026-10-30_at_1_06_50_PM.mp4",
]);

// Newest uploads, shown first in this order; the rest follow alphabetically.
const newestFirst = [
  "wedding_arch_v2.mp4",
  "wedding_invitation_v2.mp4",
  "save_the_date_v2.mp4",
  "IMG_9895.mp4",
  "IMG_9896.mp4",
  "IMG_9897.mp4",
  "IMG_9898.mp4",
  "IMG_9899.mp4",
];

// Each film's card shows public/videos/posters/<name>.webp: a still of the
// finished design, taken near the end of the film.
const POSTER_DIR = path.join(process.cwd(), "public", "videos", "posters");

/** Portrait phone video; used when a film has no poster to measure. */
const DEFAULT_ASPECT = 9 / 16;

/** Reads width / height from a WebP header (lossy, lossless or extended). */
function webpAspect(file: string): number | null {
  const b = readFileSync(file);
  if (b.toString("ascii", 0, 4) !== "RIFF" || b.toString("ascii", 8, 12) !== "WEBP") return null;
  const chunk = b.toString("ascii", 12, 16);
  let w = 0;
  let h = 0;
  if (chunk === "VP8 ") {
    w = b.readUInt16LE(26) & 0x3fff;
    h = b.readUInt16LE(28) & 0x3fff;
  } else if (chunk === "VP8L") {
    const bits = b.readUInt32LE(21);
    w = (bits & 0x3fff) + 1;
    h = ((bits >> 14) & 0x3fff) + 1;
  } else if (chunk === "VP8X") {
    w = b.readUIntLE(24, 3) + 1;
    h = b.readUIntLE(27, 3) + 1;
  }
  return w && h ? w / h : null;
}

const videoTitles: Record<string, string> = {
  "wedding_arch_v2.mp4": "Violet Arch",
  "wedding_invitation_v2.mp4": "Lace & Vine",
  "save_the_date_v2.mp4": "Crimson Lily",
  "IMG_9895.mp4": "Blossom Monogram",
  "IMG_9896.mp4": "Lavender Verse",
  "IMG_9897.mp4": "Wildflower Frame",
  "IMG_9898.mp4": "Peacock Palace",
  "IMG_9899.mp4": "Lotus Arch",
  "WhatsApp_Video_2026-10-17_at_7_25_40_PM.mp4": "Garden Aisle",
  "WhatsApp_Video_2026-10-17_at_7_35_15_PM.mp4": "Gold Arch",
  "WhatsApp_Video_2026-10-20_at_10_19_29_PM.mp4": "Rose Procession",
  "WhatsApp_Video_2026-10-20_at_10_27_53_PM.mp4": "Lantern Night",
  "WhatsApp_Video_2026-10-30_at_12_59_28_PM.mp4": "Palace Courtyard",
  "WhatsApp_Video_2026-10-30_at_1_00_06_PM.mp4": "Blush Canopy",
  "WhatsApp_Video_2026-10-30_at_1_01_06_PM.mp4": "Sage Promise",
  "WhatsApp_Video_2026-10-30_at_1_01_43_PM.mp4": "Henna Hour",
  "WhatsApp_Video_2026-10-30_at_1_02_07_PM.mp4": "Floral Gate",
  "WhatsApp_Video_2026-10-30_at_1_03_27_PM.mp4": "Candlelit Names",
  "WhatsApp_Video_2026-10-30_at_1_04_15_PM.mp4": "Terrace Blessing",
  "WhatsApp_Video_2026-10-30_at_1_05_37_PM.mp4": "Orchard Light",
  "WhatsApp_Video_2026-10-30_at_1_07_43_PM.mp4": "Moonlit Entry",
  "WhatsApp_Video_2026-10-30_at_1_08_53_PM.mp4": "Jasmine Frame",
  "WhatsApp_Video_2026-10-30_at_1_08_54_PM.mp4": "Velvet Evening",
  "WhatsApp_Video_2026-10-30_at_1_08_54_PM__1_.mp4": "Soft Horizon",
  "WhatsApp_Video_2026-10-30_at_1_11_04_PM.mp4": "First Dance",
};

function rank(file: string) {
  const i = newestFirst.indexOf(file);
  return i === -1 ? newestFirst.length : i;
}

function readVideos(): InvitationVideo[] {
  const files = readdirSync(VIDEO_DIR)
    .filter((file) => file.toLowerCase().endsWith(".mp4") && !hiddenVideos.has(file))
    .sort((a, b) => rank(a) - rank(b) || a.localeCompare(b, "en"));

  return files.map((file, index) => {
    const id = file
      .replace(/\.mp4$/i, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    const name = file.replace(/\.mp4$/i, "");
    const posterFile = path.join(POSTER_DIR, `${name}.webp`);
    const hasPoster = existsSync(posterFile);

    return {
      id,
      title: videoTitles[file] ?? `Film ${index + 1}`,
      src: `/videos/compressed/${file}`,
      aspect: (hasPoster && webpAspect(posterFile)) || DEFAULT_ASPECT,
      ...(hasPoster ? { poster: `/videos/posters/${name}.webp` } : {}),
    };
  });
}

export const videos: InvitationVideo[] = readVideos();
