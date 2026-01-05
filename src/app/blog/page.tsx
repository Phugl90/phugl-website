import Link from "next/link";
import { getAllPosts, getAllTags } from "@/lib/blog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Blog",
  description: "Tanker og indsigter om AI, teknologi og implementering i offentlig sektor.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight">Blog</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Tanker og indsigter om AI, teknologi og implementering i offentlig sektor.
          </p>
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Posts */}
        {posts.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">
                Ingen blogindlæg endnu. Kom snart tilbage!
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-8">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <Card className="transition-colors hover:bg-muted/50">
                  <CardHeader>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString("da-DK", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </time>
                      <span>·</span>
                      <span>{post.readingTime}</span>
                    </div>
                    <CardTitle className="text-2xl">{post.title}</CardTitle>
                    <CardDescription className="text-base">
                      {post.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
