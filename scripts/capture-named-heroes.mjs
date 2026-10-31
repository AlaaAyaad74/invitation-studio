import { chromium } from "playwright";
import sharp from "sharp";

const HIDE = `
  nextjs-portal, [data-nextjs-toast] { display: none !important; }
  button[aria-label*="music" i], button[aria-label*="Music"] { display: none !important; }
`;

const shots = [
  {
    slug: "botanical-named",
    url: "http://localhost:3000/templates/botanical",
  },
  {
    slug: "elegant-named",
    url: "http://localhost:3000/templates/elegant",
  },
  {
    slug: "coastal-light-named",
    url: "http://localhost:3000/templates/coastal-light",
    openSeal: true,
  },
];

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 375, height: 667 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
});
const page = await context.newPage();

for (const shot of shots) {
  await page.goto(shot.url, { waitUntil: "networkidle" });
  await page.addStyleTag({ content: HIDE });

  if (shot.openSeal) {
    const seal = page.getByRole("button", { name: /tap to open/i });
    if (await seal.count()) await seal.click();
  }

  await page.waitForTimeout(400);
  await page.evaluate(() => {
    document.querySelectorAll("[data-ready]").forEach((el) => {
      el.setAttribute("data-ready", "true");
    });
    document.querySelectorAll("[data-revealed]").forEach((el) => {
      el.setAttribute("data-revealed", "true");
    });
    document.querySelectorAll("button").forEach((button) => {
      if (/tap to open/i.test(button.textContent || "")) button.remove();
      if (/music/i.test(button.getAttribute("aria-label") || "")) button.remove();
    });
    document.querySelectorAll("video").forEach((video) => {
      video.muted = true;
      video.play().catch(() => {});
    });
  });
  await page.waitForTimeout(1600);

  const png = await page.screenshot({ type: "png", fullPage: false });
  const out = `public/templates/${shot.slug}.webp`;
  const info = await sharp(png).webp({ quality: 90 }).toFile(out);
  console.log(shot.slug, info);
}

await browser.close();
