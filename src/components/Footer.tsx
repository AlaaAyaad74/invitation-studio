import { FaInstagram, FaTiktok } from "react-icons/fa6";
import ImageWithSkeleton from "@/components/ImageWithSkeleton";
import Reveal from "@/components/Reveal";
import { siteConfig } from "@/lib/site";

const socialClassName =
  "footer-instagram inline-flex items-center gap-2 text-sm font-semibold text-sage-deep underline underline-offset-4 transition hover:text-ink";

export default function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-ivory-deep/70 py-10">
      <Reveal className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-5 sm:flex-row sm:justify-between sm:px-8">
        <ImageWithSkeleton
          native
          src="/logo.webp"
          alt="Invitation Studio"
          width={160}
          height={160}
          className="h-36 w-36 shrink-0 object-contain sm:h-40 sm:w-40"
          wrapperClassName="shrink-0"
          skeletonClassName="min-h-36 w-36 rounded-md sm:min-h-40 sm:w-40"
        />
        <p className="max-w-sm text-center text-sm text-ink-muted sm:max-w-none sm:text-left">
          Wedding invitation websites, invitation photos, films & custom couple branding.
        </p>
        <div className="flex flex-row items-center gap-2">
          <a
            href={siteConfig.instagramDmUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={socialClassName}
          >
            <FaInstagram className="h-4 w-4" aria-hidden />
            @{siteConfig.instagram}
          </a>
          <span className="text-sm font-semibold text-sage-deep" aria-hidden>
            |
          </span>
          <a
            href={siteConfig.tiktokUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={socialClassName}
          >
            <FaTiktok className="h-4 w-4" aria-hidden />
            @{siteConfig.tiktok}
          </a>
        </div>
      </Reveal>
    </footer>
  );
}
