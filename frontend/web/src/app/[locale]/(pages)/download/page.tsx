import { getTranslations } from 'next-intl/server';
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { 
  Monitor, 
  AppleIcon, 
  Terminal, 
  SmartphoneNfc, 
  Smartphone,
  ExternalLink 
} from "lucide-react";
import type { Metadata } from "next";

export async function generateMetadata(
  { params: { locale } }: { params: { locale: string } }
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'download.metadata' });
  return {
    title: t('title'),
    description: t('description'),
  };
}

interface Platform {
  name: string;
  icon: typeof Monitor;
  version: string;
  requirements: string;
  cta: string;
  url: string;
}

export default async function DownloadPage() {
  const t = await getTranslations('download');

  const platforms: Platform[] = [
    {
      name: t('platforms.windows.name'),
      icon: Monitor,
      version: "v2rayN",
      requirements: t('platforms.windows.requirements'),
      cta: t('platforms.windows.cta'),
      url: "https://github.com/2dust/v2rayN/releases"
    },
    {
      name: t('platforms.mac.name'),
      icon: AppleIcon,
      version: "V2rayU",
      requirements: t('platforms.mac.requirements'),
      cta: t('platforms.mac.cta'),
      url: "https://github.com/yanue/V2rayU/releases"
    },
    {
      name: t('platforms.linux.name'),
      icon: Terminal,
      version: "Qv2ray",
      requirements: t('platforms.linux.requirements'),
      cta: t('platforms.linux.cta'),
      url: "https://github.com/Qv2ray/Qv2ray/releases"
    },
    {
      name: t('platforms.android.name'),
      icon: SmartphoneNfc,
      version: "v2rayNG",
      requirements: t('platforms.android.requirements'),
      cta: t('platforms.android.cta'),
      url: "https://github.com/2dust/v2rayNG/releases"
    },
    {
      name: t('platforms.ios.name'),
      icon: Smartphone,
      version: "Shadowrocket",
      requirements: t('platforms.ios.requirements'),
      cta: t('platforms.ios.cta'),
      url: "https://apps.apple.com/us/app/shadowrocket/id932747118"
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

      {/* Download Platforms */}
      <section className="py-20 md:py-32">
        <Container>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {platforms.map((platform, index) => (
              <div
                key={index}
                className="rounded-lg border p-8 transition-colors hover:border-foreground"
              >
                <div className="mb-4 flex items-center gap-4">
                  <div className="rounded-lg bg-primary/10 p-3">
                    <platform.icon className="size-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{platform.name}</h3>
                </div>
                <div className="mb-6 space-y-2 text-sm text-muted-foreground">
                  <p>{t('client')}: {platform.version}</p>
                  <p>{t('requirements')}: {platform.requirements}</p>
                </div>
                <Button 
                  className="flex w-full items-center justify-center gap-2" 
                  asChild
                >
                  <a href={platform.url} target="_blank" rel="noopener noreferrer">
                    {platform.cta}
                    <ExternalLink className="size-4" />
                  </a>
                </Button>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Installation Guide */}
      <section className="border-t py-20 md:py-32">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-12 text-center text-3xl font-bold">
              {t('guide.title')}
            </h2>
            <div className="space-y-8">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex gap-4">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {step}
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold">
                      {t(`guide.steps.${step}.title`)}
                    </h3>
                    <p className="text-muted-foreground">
                      {t(`guide.steps.${step}.description`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
} 