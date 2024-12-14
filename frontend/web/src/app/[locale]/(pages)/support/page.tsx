import { getTranslations } from 'next-intl/server';
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { 
  Mail, 
  MessageCircle, 
  FileText, 
  ExternalLink 
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Metadata } from "next";

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: 'support.metadata' });
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function SupportPage() {
  const t = await getTranslations('support');

  const contactMethods = [
    {
      icon: Mail,
      title: t('contact.email.title'),
      description: t('contact.email.description'),
      cta: t('contact.email.cta'),
      href: 'mailto:support@example.com'
    },
    {
      icon: MessageCircle,
      title: t('contact.chat.title'),
      description: t('contact.chat.description'),
      cta: t('contact.chat.cta'),
      href: '#'
    },
    {
      icon: FileText,
      title: t('contact.docs.title'),
      description: t('contact.docs.description'),
      cta: t('contact.docs.cta'),
      href: '#'
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

      {/* Contact Methods */}
      <section className="py-20 md:py-32">
        <Container>
          <div className="grid gap-8 md:grid-cols-3">
            {contactMethods.map((method, index) => (
              <div
                key={index}
                className="rounded-lg border p-8 transition-colors hover:border-foreground"
              >
                <div className="mb-4 flex items-center gap-4">
                  <div className="rounded-lg bg-primary/10 p-3">
                    <method.icon className="size-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{method.title}</h3>
                </div>
                <p className="mb-6 text-sm text-muted-foreground">
                  {method.description}
                </p>
                <Button 
                  className="flex w-full items-center justify-center gap-2" 
                  variant="outline"
                  asChild
                >
                  <a href={method.href} target="_blank" rel="noopener noreferrer">
                    {method.cta}
                    <ExternalLink className="size-4" />
                  </a>
                </Button>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="border-t py-20 md:py-32">
        <Container>
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-12 text-center text-3xl font-bold">
              {t('faq.title')}
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {[1, 2, 3, 4, 5].map((item) => (
                <AccordionItem key={item} value={`item-${item}`}>
                  <AccordionTrigger>
                    {t(`faq.items.${item}.question`)}
                  </AccordionTrigger>
                  <AccordionContent>
                    {t(`faq.items.${item}.answer`)}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Container>
      </section>
    </>
  );
} 