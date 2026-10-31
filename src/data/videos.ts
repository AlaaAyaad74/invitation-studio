import { readdirSync } from "node:fs";
import path from "node:path";

export type InvitationVideo = {
  id: string;
  title: string;
  src: string;
};

const VIDEO_DIR = path.join(process.cwd(), "public", "videos", "compressed");

const hiddenVideos = new Set([
  "WhatsApp_Video_2026-10-17_at_8_07_18_PM.mp4",
  "WhatsApp_Video_2026-10-30_at_1_06_50_PM.mp4",
]);

const videoTitles: Record<string, string> = {
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

function readVideos(): InvitationVideo[] {
  const files = readdirSync(VIDEO_DIR)
    .filter((file) => file.toLowerCase().endsWith(".mp4") && !hiddenVideos.has(file))
    .sort((a, b) => a.localeCompare(b, "en"));

  return files.map((file, index) => {
    const id = file
      .replace(/\.mp4$/i, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    return {
      id,
      title: videoTitles[file] ?? `Film ${index + 1}`,
      src: `/videos/compressed/${file}`,
    };
  });
}

export const videos: InvitationVideo[] = readVideos();
