import { getTranslations } from 'next-intl/server';
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight,
  Clock,
  User
} from "lucide-react";
import type { Metadata } from "next";

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: 'blog.metadata' });
  return {
    title: t('title'),
    description: t('description'),
  };
}

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  slug: string;
}

export default async function BlogPage() {
  const t = await getTranslations('blog');

  const posts: BlogPost[] = [1, 2, 3, 4, 5, 6].map((id) => ({
    id,
    title: t(`posts.${id}.title`),
    excerpt: t(`posts.${id}.excerpt`),
    author: t(`posts.${id}.author`),
    date: t(`posts.${id}.date`),
    readTime: t(`posts.${id}.readTime`),
    category: t(`posts.${id}.category`),
    slug: t(`posts.${id}.slug`),
  }));

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

      {/* Blog Posts */}
      <section className="py-20 md:py-32">
        <Container>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.id}
                className="group rounded-lg border p-6 transition-colors hover:border-foreground"
              >
                <div className="mb-4">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                    {post.category}
                  </span>
                </div>
                <h2 className="mb-4 text-2xl font-bold">{post.title}</h2>
                <p className="mb-6 text-muted-foreground">{post.excerpt}</p>
                <div className="mb-6 flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <User className="size-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="size-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                <Button 
                  variant="link" 
                  className="group flex items-center gap-2 p-0 text-foreground"
                  asChild
                >
                  <a href={`/blog/${post.slug}`}>
                    {t('readMore')}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
} 