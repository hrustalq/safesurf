import React from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./components.css";
import { Metadata } from "next";
import { getTranslations } from 'next-intl/server';

import { ThemeProvider } from "@/components/providers/theme-provider";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Locale } from "@/i18n/types";
import HeaderNav from "@/components/navigation/header-nav";
import FooterNav from '@/components/navigation/footer-nav';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: {
      template: `%s | ${t('site.name')}`,
      default: t('site.title'),
    },
    description: t('site.description'),
    keywords: t('site.keywords'),
    authors: [{ name: 'VPN Service' }],
    openGraph: {
      title: t('site.title'),
      description: t('site.description'),
      locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('site.title'),
      description: t('site.description'),
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{locale: string}>
}>) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();
  setRequestLocale(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
            <div className="relative flex min-h-screen flex-col">
              <HeaderNav />
              <main className="flex-1">{children}</main>
              <FooterNav />
            </div>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
