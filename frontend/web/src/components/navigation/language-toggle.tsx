import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface LanguageToggleProps {
  className?: string;
  displayType?: 'dropdown' | 'inline';
  modal?: boolean;
}

export async function LanguageToggle({ className, displayType = 'dropdown', modal = false }: LanguageToggleProps) {
  const t = await getTranslations('navigation');


  if (displayType === 'inline') {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <Globe className="size-5" />
        <Link locale="en" href="/" className="text-sm font-medium">
          {t('english')}
        </Link>
        <Link locale="ru" href="/" className="text-sm font-medium">
          {t('russian')}
        </Link>
      </div>
    );
  }

  return (
    <DropdownMenu modal={modal}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Globe className="size-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="bottom">
        <DropdownMenuItem>
          <Link className="w-full" locale="en" href="/">{t('english')}</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link className="w-full" locale="ru" href="/">{t('russian')}</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 