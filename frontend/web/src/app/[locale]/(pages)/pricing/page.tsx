import { getTranslations } from 'next-intl/server';
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import type { Metadata } from "next";

interface Plan {
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  popular?: boolean;
}

export async function generateMetadata(
  { params: { locale } }: { params: { locale: string } }
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'pricing.metadata' });
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function PricingPage() {
  const t = await getTranslations('pricing');

  // Helper function to get features array
  const getFeatures = (key: string): string[] => {
    try {
      const features: string[] = [];
      // Define max features for each plan
      const maxFeatures = {
        monthly: 5,
        yearly: 6,
        business: 7
      };
      
      // Get the correct number of features for this plan
      const count = maxFeatures[key as keyof typeof maxFeatures] || 0;
      
      for (let i = 1; i <= count; i++) {
        try {
          const feature = t(`plans.${key}.features.${i}`);
          features.push(feature);
        } catch {
          break; // Stop when we can't find more features
        }
      }
      return features;
    } catch {
      return [];
    }
  };

  const plans: Plan[] = [
    {
      name: t('plans.monthly.name'),
      price: t('plans.monthly.price'),
      description: t('plans.monthly.description'),
      features: getFeatures('monthly'),
      cta: t('plans.monthly.cta'),
    },
    {
      name: t('plans.yearly.name'),
      price: t('plans.yearly.price'),
      description: t('plans.yearly.description'),
      features: getFeatures('yearly'),
      cta: t('plans.yearly.cta'),
      popular: true,
    },
    {
      name: t('plans.business.name'),
      price: t('plans.business.price'),
      description: t('plans.business.description'),
      features: getFeatures('business'),
      cta: t('plans.business.cta'),
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

      {/* Pricing Plans */}
      <section className="py-20 md:py-32">
        <Container>
          <div className="grid gap-8 md:grid-cols-3">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`rounded-lg border p-8 ${
                  plan.popular
                    ? 'border-primary ring-2 ring-primary ring-offset-2'
                    : ''
                }`}
              >
                {plan.popular && (
                  <span className="mb-2 inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                    {t('popular')}
                  </span>
                )}
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <p className="mt-4 text-muted-foreground">{plan.description}</p>
                <div className="my-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">
                    {plan.name !== t('plans.business.name') ? '/mo' : ''}
                  </span>
                </div>
                <Button className="w-full" variant={plan.popular ? 'default' : 'outline'}>
                  {plan.cta}
                </Button>
                <ul className="mt-8 space-y-4">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <Check className="size-5 text-primary" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}