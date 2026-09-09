import { siteConfig } from "@/lib/site";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = `${siteConfig.name} — ${siteConfig.description}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const logo = await readFile(join(process.cwd(), "src/app/icon.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background: "#f7f3ee",
          alignItems: "center",
          justifyContent: "center",
          padding: 64,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 56,
            maxWidth: 1080,
          }}
        >
          <img
            src={logoSrc}
            alt=""
            width={320}
            height={320}
            style={{ borderRadius: 24 }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: 640,
            }}
          >
            <div
              style={{
                fontSize: 52,
                lineHeight: 1.1,
                color: "#2a2623",
                letterSpacing: "-0.02em",
              }}
            >
              {siteConfig.name}
            </div>
            <div
              style={{
                marginTop: 20,
                fontSize: 26,
                lineHeight: 1.45,
                color: "#6b635c",
              }}
            >
              {siteConfig.description}
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
