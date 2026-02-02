import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import localFont from "next/font/local";
import "./globals.css";

const theBasics = localFont({
  src: [
    { path: "../fonts/TheBasics/TheBasics-DisplayThin.woff2", weight: "100" },
    { path: "../fonts/TheBasics/TheBasics-Regular.woff2", weight: "400" },
    { path: "../fonts/TheBasics/TheBasics-RegularItalic.woff2", weight: "400", style: "italic" },
    { path: "../fonts/TheBasics/TheBasics-Medium.woff2", weight: "500" },
    { path: "../fonts/TheBasics/TheBasics-Bold.woff2", weight: "700" },
    { path: "../fonts/TheBasics/TheBasics-Black.woff2", weight: "900" },
    { path: "../fonts/TheBasics/TheBasics-DisplayBlack.woff2", weight: "900" },
  ],
  variable: "--font-the-basics",
  display: "swap",
});

const theBasicsMono = localFont({
  src: [{ path: "../fonts/TheBasics/TheBasics-Mono.woff2" }],
  variable: "--font-the-basics-mono",
  display: "swap",
});

const nextExit = localFont({
  src: [
    { path: "../fonts/next-exit/NextExitRegular.woff2", weight: "400" },
    { path: "../fonts/next-exit/NextExitBold.woff2", weight: "700" },
  ],
  variable: "--font-next-exit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "פסטיבל קולנוע דרום",
  description: "פסטיבל קולנוע דרום הבינלאומי",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();
  const dir = locale === "he" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir} className={`${theBasics.variable} ${theBasicsMono.variable} ${nextExit.variable}`}>
      <body className="min-h-screen font-sans">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
