/** Tailwind classes for the Heritage Script invitation body; the custom
    couples invitation reuses them. */
const caps = "font-[family-name:var(--font-heritage-caps),'Times_New_Roman',serif] uppercase";

const styles = {
  root: "relative bg-[#5c0e1c] font-[family-name:var(--font-heritage-serif),Georgia,serif] text-[#f8efe3]",
  label: `m-0 ${caps} text-[0.68rem] font-medium tracking-[0.34em] text-[#f3e0b8] [&:lang(ar)]:text-[0.95rem]`,
  details: "px-6 pt-[2.6rem] pb-1",
  heading: "mx-0 mt-0 mb-7 text-center font-[family-name:var(--font-heritage-script),'Great_Vibes',cursive] text-[2.6rem] leading-none font-normal text-[#f8efe3]",
  list: "m-0 flex list-none flex-col gap-[1.85rem] p-0",
  item: "p-0 text-center",
  value: "mt-[0.45rem] block font-[family-name:var(--font-heritage-serif),Georgia,serif] text-[1.7rem] leading-[1.15] font-medium tracking-[0.01em] text-[#fffaf3] italic",
  note: "mt-[0.3rem] block font-[family-name:var(--font-heritage-script),'Great_Vibes',cursive] text-[1.45rem] text-[rgba(248,239,227,0.78)] not-italic",
  link: `mt-[0.85rem] inline-flex items-center justify-center gap-[0.4rem] ${caps} text-[0.62rem] leading-none font-medium tracking-[0.18em] [&:lang(ar)]:text-[0.9rem] text-[#e8c48a] no-underline hover:text-[#fffaf3] focus-visible:text-[#fffaf3] focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[#e8c48a]`,
  linkIcon: "h-[0.95rem] w-[0.95rem] fill-none stroke-current stroke-[1.6]",
  credit: `px-6 pt-[1.6rem] pb-[2.2rem] text-center ${caps} text-[0.62rem] tracking-[0.28em] text-[rgba(243,224,184,0.78)]`,
};

export default styles;
