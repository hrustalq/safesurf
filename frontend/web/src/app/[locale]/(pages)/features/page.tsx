import { getTranslations } from 'next-intl/server';
import { Container } from "@/components/ui/container";
import { Shield, Globe, Zap, Lock, Wifi, Cloud, Clock, Users } from "lucide-react";
import type { Metadata } from "next";

export async function generateMetadata(
  { params: { locale } }: { params: { locale: string } }
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'features.metadata' });
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function FeaturesPage() {
  const t = await getTranslations('features');

  const features = [
    {
      icon: Shield,
      title: t('list.security.title'),
      description: t('list.security.description'),
    },
    {
      icon: Globe,
      title: t('list.global.title'),
      description: t('list.global.description'),
    },
    {
      icon: Zap,
      title: t('list.speed.title'),
      description: t('list.speed.description'),
    },
    {
      icon: Lock,
      title: t('list.privacy.title'),
      description: t('list.privacy.description'),
    },
    {
      icon: Wifi,
      title: t('list.devices.title'),
      description: t('list.devices.description'),
    },
    {
      icon: Cloud,
      title: t('list.servers.title'),
      description: t('list.servers.description'),
    },
    {
      icon: Clock,
      title: t('list.support.title'),
      description: t('list.support.description'),
    },
    {
      icon: Users,
      title: t('list.simultaneous.title'),
      description: t('list.simultaneous.description'),
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

      {/* Features Grid */}
      <section className="py-20 md:py-32">
        <Container>
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