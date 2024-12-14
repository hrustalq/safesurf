import { getTranslations } from 'next-intl/server';
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Shield, Globe, Zap, Lock } from "lucide-react";
import { Metadata } from "next";

export default async function Home() {
  const t = await getTranslations('home');

  const features = [
    {
      icon: Shield,
      title: t('features.security.title'),
      description: t('features.security.description'),
    },
    {
      icon: Globe,
      title: t('features.global.title'),
      description: t('features.global.description'),
    },
    {
      icon: Zap,
      title: t('features.speed.title'),
      description: t('features.speed.description'),
    },
    {
      icon: Lock,
      title: t('features.privacy.title'),
      description: t('features.privacy.description'),
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b py-20 md:py-32">
        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl">
              {t('hero.title')}
            </h1>
            <p className="mb-10 text-xl text-muted-foreground">
              {t('hero.description')}
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg">{t('hero.cta.primary')}</Button>
              <Button variant="outline" size="lg">
                {t('hero.cta.secondary')}
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
              {t('features.title')}
            </h2>
            <p className="mb-16 text-lg text-muted-foreground">
              {t('features.subtitle')}
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group rounded-lg border p-6 transition-colors hover:border-foreground"
              >
                <div className="mb-4 inline-block rounded-lg bg-primary/10 p-3">
                  <feature.icon className="size-6 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: 'home.metadata' });

  return {
    title: t('title'),
    description: t('description'),
  };
}
