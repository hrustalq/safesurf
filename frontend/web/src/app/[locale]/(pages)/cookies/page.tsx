import { getTranslations } from 'next-intl/server';
import { Container } from "@/components/ui/container";
import { 
  Cookie, 
  Shield, 
  Settings,
  ToggleLeft,
  Info,
  Clock
} from "lucide-react";
import type { Metadata } from "next";

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: 'cookies.metadata' });
  return {
    title: t('title'),
    description: t('description'),
  };
}

interface CookieSection {
  icon: typeof Cookie;
  title: string;
  description: string;
}

export default async function CookiesPage() {
  const t = await getTranslations('cookies');

  const sections: CookieSection[] = [
    {
      icon: Cookie,
      title: t('sections.what.title'),
      description: t('sections.what.description'),
    },
    {
      icon: Shield,
      title: t('sections.necessary.title'),
      description: t('sections.necessary.description'),
    },
    {
      icon: Settings,
      title: t('sections.functional.title'),
      description: t('sections.functional.description'),
    },
    {
      icon: ToggleLeft,
      title: t('sections.control.title'),
      description: t('sections.control.description'),
    },
    {
      icon: Info,
      title: t('sections.thirdParty.title'),
      description: t('sections.thirdParty.description'),
    },
    {
      icon: Clock,
      title: t('sections.duration.title'),
      description: t('sections.duration.description'),
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="border-b py-20 md:py-32">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl">
              {t('hero.title')}
            </h1>
            <p className="text-xl text-muted-foreground">
              {t('hero.description')}
            </p>
          </div>
        </Container>
      </section>

      {/* Last Updated */}
      <section className="py-8 md:py-12">
        <Container>
          <div className="mx-auto max-w-3xl">
            <p className="text-sm text-muted-foreground">
              {t('lastUpdated')}
            </p>
          </div>
        </Container>
      </section>

      {/* Cookie Sections */}
      <section className="pb-20 md:pb-32">
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="space-y-16">
              {sections.map((section, index) => (
                <div key={index} className="flex gap-6">
                  <div className="h-fit rounded-lg bg-primary/10 p-3">
                    <section.icon className="size-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="mb-4 text-xl font-semibold">
                      {section.title}
                    </h2>
                    <div className="whitespace-pre-wrap text-muted-foreground">
                      {section.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Contact Section */}
      <section className="border-t py-20 md:py-32">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-2xl font-bold">
              {t('contact.title')}
            </h2>
            <p className="mb-8 text-muted-foreground">
              {t('contact.description')}
            </p>
            <a
              href="mailto:privacy@example.com"
              className="text-primary hover:underline"
            >
              privacy@example.com
            </a>
          </div>
        </Container>
      </section>
    </>
  );
} 