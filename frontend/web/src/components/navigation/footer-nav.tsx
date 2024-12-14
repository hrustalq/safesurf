import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Container } from '@/components/ui/container';
import { Twitter, Facebook, Instagram, Send } from 'lucide-react';

export default async function FooterNav() {
  const t = await getTranslations('navigation');

  const footerSections = {
    company: [
      { href: '/about', label: t('about') },
      { href: '/contact', label: t('contact') },
      { href: '/blog', label: t('blog') },
    ],
    legal: [
      { href: '/privacy', label: t('privacy') },
      { href: '/terms', label: t('terms') },
      { href: '/cookies', label: t('cookies') },
    ],
    support: [
      { href: '/faq', label: t('faq') },
      { href: '/support', label: t('support') },
      { href: '/status', label: t('status') },
    ],
  };

  return (
    <footer className="border-t bg-background">
      <Container className="py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
          {/* Brand Section */}
          <div className="space-y-4 md:col-span-2">
            <Link href="/" className="text-xl font-bold">
              VPN Service
            </Link>
            <p className="text-sm text-muted-foreground">
              {t('footerTagline')}
            </p>
            {/* Newsletter Section */}
            <div className="mt-6 space-y-4">
              <h3 className="text-sm font-semibold">{t('newsletter')}</h3>
              <div className="flex max-w-sm gap-2">
                <Input
                  type="email"
                  placeholder={t('emailPlaceholder')}
                  className="max-w-[240px]"
                />
                <Button>
                  <Send className="mr-2 size-4" />
                  {t('subscribe')}
                </Button>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">{t('company')}</h3>
            <ul className="space-y-3">
              {footerSections.company.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">{t('legal')}</h3>
            <ul className="space-y-3">
              {footerSections.legal.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">{t('support')}</h3>
            <ul className="space-y-3">
              {footerSections.support.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} VPN Service. {t('allRightsReserved')}
          </p>
          <div className="flex gap-4">
            <Link
              href="https://twitter.com/vpnservice"
              className="text-muted-foreground hover:text-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter className="size-5" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link
              href="https://facebook.com/vpnservice"
              className="text-muted-foreground hover:text-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook className="size-5" />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link
              href="https://instagram.com/vpnservice"
              className="text-muted-foreground hover:text-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="size-5" />
              <span className="sr-only">Instagram</span>
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
