import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CursorGlow } from "@/components/CursorGlow";
import { OrganizationJsonLd, WebsiteJsonLd } from "@/components/JsonLd";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, locales, type Locale } from "@/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);

  return (
    <div lang={locale} className="relative z-[1] min-h-screen">
      <OrganizationJsonLd locale={locale} />
      <WebsiteJsonLd locale={locale} />
      <CursorGlow />
      <Header locale={locale} dict={dict} />
      <main className="relative z-[1]">{children}</main>
      <Footer locale={locale} dict={dict} />
    </div>
  );
}
