import { getTranslations } from 'next-intl/server';
import { Container } from "@/components/ui/container";
import { 
  Shield, 
  Users, 
  Globe, 
  Lock,
  Server,
  Clock
} from "lucide-react";
import type { Metadata } from "next";

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: 'about.metadata' });
  return {
    title: t('title'),
    description: t('description'),
  };
}

interface Value {
  icon: typeof Shield;
  title: string;
  description: string;
}

interface Stat {
  value: string;
  label: string;
}

export default async function AboutPage() {
  const t = await getTranslations('about');

  const values: Value[] = [
    {
      icon: Shield,
      title: t('values.privacy.title'),
      description: t('values.privacy.description'),
    },
    {
      icon: Users,
      title: t('values.community.title'),
      description: t('values.community.description'),
    },
    {
      icon: Globe,
      title: t('values.access.title'),
      description: t('values.access.description'),
    },
  ];

  const stats: Stat[] = [
    {
      value: t('stats.users.value'),
      label: t('stats.users.label'),
    },
    {
      value: t('stats.servers.value'),
      label: t('stats.servers.label'),
    },
    {
      value: t('stats.locations.value'),
      label: t('stats.locations.label'),
    },
    {
      value: t('stats.uptime.value'),
      label: t('stats.uptime.label'),
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

      {/* Mission Section */}
      <section className="py-20 md:py-32">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-12 text-3xl font-bold">
              {t('mission.title')}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t('mission.description')}
            </p>
          </div>
        </Container>
      </section>

      {/* Values Section */}
      <section className="border-y bg-muted/40 py-20 md:py-32">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-12 text-3xl font-bold">
              {t('values.title')}
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {values.map((value, index) => (
              <div
                key={index}
                className="rounded-lg border bg-background p-8 transition-colors hover:border-foreground"
              >
                <div className="mb-4 inline-block rounded-lg bg-primary/10 p-3">
                  <value.icon className="size-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">
                  {value.title}
                </h3>
                <p className="text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="py-20 md:py-32">
        <Container>
          <div className="grid gap-8 md:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="mb-2 text-4xl font-bold">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Technology Section */}
      <section className="border-t py-20 md:py-32">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-12 text-center text-3xl font-bold">
              {t('technology.title')}
            </h2>
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="h-fit rounded-lg bg-primary/10 p-3">
                  <Lock className="size-6 text-primary" />
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">
                    {t('technology.security.title')}
                  </h3>
                  <p className="text-muted-foreground">
                    {t('technology.security.description')}
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="h-fit rounded-lg bg-primary/10 p-3">
                  <Server className="size-6 text-primary" />
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">
                    {t('technology.infrastructure.title')}
                  </h3>
                  <p className="text-muted-foreground">
                    {t('technology.infrastructure.description')}
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="h-fit rounded-lg bg-primary/10 p-3">
                  <Clock className="size-6 text-primary" />
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">
                    {t('technology.performance.title')}
                  </h3>
                  <p className="text-muted-foreground">
                    {t('technology.performance.description')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
} 