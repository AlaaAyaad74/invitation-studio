"use client";

import { useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useTransition,
  type ReactNode,
} from "react";
import {
  dirOf,
  LANG_COOKIE,
  LANG_COOKIE_MAX_AGE,
  type Lang,
} from "@/lib/i18n";

type LangContextValue = {
  lang: Lang;
  setLang: (next: Lang) => void;
  pending: boolean;
};

const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider({
  lang: serverLang,
  children,
}: {
  lang: Lang;
  children: ReactNode;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [lang, setLocalLang] = useState(serverLang);
  const [seenServerLang, setSeenServerLang] = useState(serverLang);

  // The server is the source of truth after every refresh or navigation.
  if (seenServerLang !== serverLang) {
    setSeenServerLang(serverLang);
    setLocalLang(serverLang);
  }

  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = dirOf(lang);
  }, [lang]);

  const setLang = useCallback(
    (next: Lang) => {
      document.cookie = `${LANG_COOKIE}=${next}; path=/; max-age=${LANG_COOKIE_MAX_AGE}; samesite=lax`;
      // One transition: client text and the refreshed server text swap together.
      startTransition(() => {
        setLocalLang(next);
        router.refresh();
      });
    },
    [router],
  );

  const value = useMemo(
    () => ({ lang, setLang, pending }),
    [lang, setLang, pending],
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

function useLangContext() {
  const context = useContext(LangContext);
  if (!context) throw new Error("useLang must be used inside <LangProvider>");
  return context;
}

/** The visitor's current language. */
export function useLang() {
  return useLangContext().lang;
}

/** Language plus the switch, for the toggle button. */
export function useLangSwitch() {
  return useLangContext();
}
