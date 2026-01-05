import { notFound } from "next/navigation";
import Link from "next/link";
import { getPost, getAllSlugs } from "@/lib/blog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MDXContent } from "@/components/mdx-content";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    return { title: "Post ikke fundet" };
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post || !post.published) {
    notFound();
  }

  return (
    <article className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-3xl">
        {/* Back link */}
        <Button variant="ghost" asChild className="mb-8">
          <Link href="/blog">← Tilbage til blog</Link>
        </Button>

        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("da-DK", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span>·</span>
            <span>{post.readingTime}</span>
            <span>·</span>
            <span>{post.author}</span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {post.title}
          </h1>

          <p className="mt-4 text-xl text-muted-foreground">
            {post.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </header>

        {/* Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <MDXContent content={post.content} />
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t">
          <div className="flex items-center justify-between">
            <Button variant="outline" asChild>
              <Link href="/blog">← Flere indlæg</Link>
            </Button>
            <Button asChild>
              <Link href="/kontakt">Kontakt mig</Link>
            </Button>
          </div>
        </footer>
      </div>
    </article>
  );
}
