import { getTranslations } from 'next-intl/server';
import { Container } from "@/components/ui/container";
import {
  ChevronDown,
  Search
} from "lucide-react";
import type { Metadata } from "next";

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: 'faq.metadata' });
  return {
    title: t('title'),
    description: t('description'),
  };
}

interface FAQCategory {
  title: string;
  questions: {
    question: string;
    answer: string;
  }[];
}

export default async function FAQPage() {
  const t = await getTranslations('faq');

  const categories: FAQCategory[] = [
    {
      title: t('categories.general.title'),
      questions: [
        {
          question: t('categories.general.1.question'),
          answer: t('categories.general.1.answer'),
        },
        {
          question: t('categories.general.2.question'),
          answer: t('categories.general.2.answer'),
        },
        {
          question: t('categories.general.3.question'),
          answer: t('categories.general.3.answer'),
        },
      ],
    },
    {
      title: t('categories.technical.title'),
      questions: [
        {
          question: t('categories.technical.1.question'),
          answer: t('categories.technical.1.answer'),
        },
        {
          question: t('categories.technical.2.question'),
          answer: t('categories.technical.2.answer'),
        },
        {
          question: t('categories.technical.3.question'),
          answer: t('categories.technical.3.answer'),
        },
      ],
    },
    {
      title: t('categories.account.title'),
      questions: [
        {
          question: t('categories.account.1.question'),
          answer: t('categories.account.1.answer'),
        },
        {
          question: t('categories.account.2.question'),
          answer: t('categories.account.2.answer'),
        },
        {
          question: t('categories.account.3.question'),
          answer: t('categories.account.3.answer'),
        },
      ],
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

      {/* Search Section */}
      <section className="py-12">
        <Container>
          <div className="mx-auto max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder={t('search.placeholder')}
                className="h-14 w-full rounded-lg border bg-background pl-12 pr-4 text-foreground"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ Categories */}
      <section className="pb-20 md:pb-32">
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="space-y-12">
              {categories.map((category, index) => (
                <div key={index}>
                  <h2 className="mb-6 text-2xl font-bold">
                    {category.title}
                  </h2>
                  <div className="space-y-4">
                    {category.questions.map((item, qIndex) => (
                      <details key={qIndex} className="group rounded-lg border">
                        <summary className="flex cursor-pointer items-center justify-between p-6">
                          <h3 className="font-medium">
                            {item.question}
                          </h3>
                          <ChevronDown className="size-5 transition-transform group-open:rotate-180" />
                        </summary>
                        <div className="border-t px-6 pb-6 pt-4">
                          <p className="whitespace-pre-wrap text-muted-foreground">
                            {item.answer}
                          </p>
                        </div>
                      </details>
                    ))}
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
              href="mailto:support@example.com"
              className="text-primary hover:underline"
            >
              support@example.com
            </a>
          </div>
        </Container>
      </section>
    </>
  );
} 