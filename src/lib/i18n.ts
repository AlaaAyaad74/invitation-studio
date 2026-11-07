export const LANGS = ["en", "ar"] as const;

export type Lang = (typeof LANGS)[number];

export const DEFAULT_LANG: Lang = "en";

/** Cookie that remembers the visitor's language for a year. */
export const LANG_COOKIE = "lang";
export const LANG_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export function isLang(value: unknown): value is Lang {
  return typeof value === "string" && (LANGS as readonly string[]).includes(value);
}

export function dirOf(lang: Lang) {
  return lang === "ar" ? "rtl" : "ltr";
}

/**
 * Turns an `as const` literal object into its plain shape (string, number,
 * readonly arrays), so a second language can share the type of the first.
 */
export type Widen<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends boolean
      ? boolean
      : T extends readonly (infer U)[]
        ? readonly Widen<U>[]
        : { [K in keyof T]: Widen<T[K]> };

/** Template content in one language: the widened shape plus its `lang`. */
export type Localized<T> = Omit<Widen<T>, "lang"> & { lang: Lang };
