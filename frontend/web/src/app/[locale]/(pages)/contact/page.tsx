import { getTranslations } from 'next-intl/server';
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Mail, 
  MessageCircle, 
  Clock,
  ExternalLink 
} from "lucide-react";
import type { Metadata } from "next";

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: 'contact.metadata' });
  return {
    title: t('title'),
    description: t('description'),
  };
}

interface ContactMethod {
  icon: typeof Mail;
  title: string;
  description: string;
  link?: string;
  linkText?: string;
}

export default async function ContactPage() {
  const t = await getTranslations('contact');

  const contactMethods: ContactMethod[] = [
    {
      icon: Mail,
      title: t('methods.email.title'),
      description: t('methods.email.description'),
      link: 'mailto:support@example.com',
      linkText: 'support@example.com'
    },
    {
      icon: MessageCircle,
      title: t('methods.chat.title'),
      description: t('methods.chat.description'),
      link: '#',
      linkText: t('methods.chat.linkText')
    },
    {
      icon: Clock,
      title: t('methods.hours.title'),
      description: t('methods.hours.description')
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

      {/* Contact Form & Info */}
      <section className="py-20 md:py-32">
        <Container>
          <div className="grid gap-16 md:grid-cols-2">
            {/* Contact Form */}
            <div>
              <h2 className="mb-8 text-2xl font-bold">
                {t('form.title')}
              </h2>
              <form className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="text-sm font-medium">
                      {t('form.firstName')}
                    </label>
                    <Input 
                      id="firstName" 
                      name="firstName" 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="text-sm font-medium">
                      {t('form.lastName')}
                    </label>
                    <Input 
                      id="lastName" 
                      name="lastName" 
                      required 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    {t('form.email')}
                  </label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    {t('form.subject')}
                  </label>
                  <Input 
                    id="subject" 
                    name="subject" 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    {t('form.message')}
                  </label>
                  <Textarea 
                    id="message" 
                    name="message" 
                    rows={6} 
                    required 
                  />
                </div>
                <Button type="submit" className="w-full md:w-auto">
                  {t('form.submit')}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="mb-8 text-2xl font-bold">
                {t('info.title')}
              </h2>
              <div className="space-y-6">
                {contactMethods.map((method, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="h-fit rounded-lg bg-primary/10 p-3">
                      <method.icon className="size-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{method.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {method.description}
                      </p>
                      {method.link && (
                        <a
                          href={method.link}
                          className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {method.linkText}
                          <ExternalLink className="size-4" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
} 