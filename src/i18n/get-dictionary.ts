import type { Locale } from "./config";
import en from "@/messages/en.json";
import sr from "@/messages/sr.json";

const dictionaries = { en, sr } as const;

export type Dictionary = typeof en;

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.en;
}
