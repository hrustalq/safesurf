import { getTranslations } from 'next-intl/server';
import { Container } from "@/components/ui/container";
import { 
  CheckCircle2, 
  XCircle,
  AlertCircle,
  Activity
} from "lucide-react";
import type { Metadata } from "next";

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: 'status.metadata' });
  return {
    title: t('title'),
    description: t('description'),
  };
}

type ServiceStatus = 'operational' | 'degraded' | 'outage';

interface Service {
  name: string;
  status: ServiceStatus;
  uptime: number;
}

export default async function StatusPage() {
  const t = await getTranslations('status');

  const services: Service[] = [
    {
      name: t('services.vpn.name'),
      status: 'operational',
      uptime: 99.98,
    },
    {
      name: t('services.auth.name'),
      status: 'operational',
      uptime: 99.99,
    },
    {
      name: t('services.api.name'),
      status: 'operational',
      uptime: 99.95,
    },
    {
      name: t('services.website.name'),
      status: 'operational',
      uptime: 100,
    },
    {
      name: t('services.billing.name'),
      status: 'operational',
      uptime: 99.97,
    },
  ];

  const getStatusIcon = (status: ServiceStatus) => {
    switch (status) {
      case 'operational':
        return <CheckCircle2 className="size-5 text-green-500" />;
      case 'degraded':
        return <AlertCircle className="size-5 text-yellow-500" />;
      case 'outage':
        return <XCircle className="size-5 text-red-500" />;
    }
  };

  const getStatusText = (status: ServiceStatus) => {
    switch (status) {
      case 'operational':
        return t('status.operational');
      case 'degraded':
        return t('status.degraded');
      case 'outage':
        return t('status.outage');
    }
  };

  // Calculate overall system status
  const overallStatus: ServiceStatus = services.some(s => s.status === 'outage')
    ? 'outage'
    : services.some(s => s.status === 'degraded')
      ? 'degraded'
      : 'operational';

  return (
    <>
      {/* Hero Section */}
      <section className="border-b py-20 md:py-32">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 flex items-center justify-center gap-3">
              <Activity className="size-12 text-primary" />
              <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
                {t('hero.title')}
              </h1>
            </div>
            <p className="text-xl text-muted-foreground">
              {t('hero.description')}
            </p>
          </div>
        </Container>
      </section>

      {/* Overall Status */}
      <section className="py-12">
        <Container>
          <div className="mx-auto max-w-3xl rounded-lg border bg-card p-6 text-center">
            <div className="mb-2 flex items-center justify-center gap-2">
              {getStatusIcon(overallStatus)}
              <h2 className="text-xl font-semibold">
                {t('overall.title')}
              </h2>
            </div>
            <p className="text-muted-foreground">
              {t('overall.description')}
            </p>
          </div>
        </Container>
      </section>

      {/* Services Status */}
      <section className="pb-20 md:pb-32">
        <Container>
          <div className="mx-auto max-w-3xl space-y-6">
            <h2 className="text-2xl font-bold">
              {t('services.title')}
            </h2>
            <div className="space-y-4">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg border bg-card p-6"
                >
                  <div className="flex items-center gap-3">
                    {getStatusIcon(service.status)}
                    <div>
                      <h3 className="font-medium">
                        {service.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {getStatusText(service.status)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      {t('services.uptime')}
                    </p>
                    <p className="text-2xl font-bold text-primary">
                      {service.uptime}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Incident History */}
      <section className="border-t py-20 md:py-32">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-2xl font-bold">
              {t('incidents.title')}
            </h2>
            <p className="mb-8 text-muted-foreground">
              {t('incidents.description')}
            </p>
            <a
              href="https://status.example.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {t('incidents.link')}
            </a>
          </div>
        </Container>
      </section>
    </>
  );
} 