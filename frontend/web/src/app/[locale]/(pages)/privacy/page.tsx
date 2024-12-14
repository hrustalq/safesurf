import { getTranslations } from 'next-intl/server';
import { Container } from "@/components/ui/container";
import { 
  Shield, 
  Eye, 
  HardDrive,
  Trash2,
  Lock,
  FileText
} from "lucide-react";
import type { Metadata } from "next";

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: 'privacy.metadata' });
  return {
    title: t('title'),
    description: t('description'),
  };
}

interface PolicySection {
  icon: typeof Shield;
  title: string;
  description: string;
}

export default async function PrivacyPage() {
  const t = await getTranslations('privacy');

  const sections: PolicySection[] = [
    {
      icon: Shield,
      title: t('sections.commitment.title'),
      description: t('sections.commitment.description'),
    },
    {
      icon: Eye,
      title: t('sections.collection.title'),
      description: t('sections.collection.description'),
    },
    {
      icon: HardDrive,
      title: t('sections.storage.title'),
      description: t('sections.storage.description'),
    },
    {
      icon: Trash2,
      title: t('sections.deletion.title'),
      description: t('sections.deletion.description'),
    },
    {
      icon: Lock,
      title: t('sections.security.title'),
      description: t('sections.security.description'),
    },
    {
      icon: FileText,
      title: t('sections.transparency.title'),
      description: t('sections.transparency.description'),
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

      {/* Policy Sections */}
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