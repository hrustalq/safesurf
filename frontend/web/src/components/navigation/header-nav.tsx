import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Sheet, SheetContent, SheetTrigger, Button, Container } from '@/components/ui';
import { Menu } from 'lucide-react';
import { LanguageToggle } from './language-toggle';
import { ModeToggle } from '@/components/mode-toggle';

export default async function HeaderNav() {
  const t = await getTranslations('navigation');

  const navItems = [
    { href: '/', label: t('home') },
    { href: '/features', label: t('features') },
    { href: '/pricing', label: t('pricing') },
    { href: '/download', label: t('download') },
    { href: '/support', label: t('support') },
  ];

  return (
    <header className="sticky inset-x-0 top-0 z-10 border-b bg-background">
      <Container>
        <nav className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold">
            VPN Service
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="link text-sm font-medium"
              >
                {item.label}
              </Link>
            ))}

            {/* Language Switcher and Theme Toggle */}
            <div className="flex items-center gap-4">
              <LanguageToggle />
              <ModeToggle />
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label={t('menu')}>
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="mt-8 flex flex-col gap-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="link text-sm font-medium"
                    >
                      {item.label}
                    </Link>
                  ))}
                  <div className="flex items-center gap-4 pt-4">
                    <LanguageToggle displayType="inline" />
                    <ModeToggle />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </Container>
    </header>
  );
}
