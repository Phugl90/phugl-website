import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Nyheder",
  description: "AI-kuraterede teknyheder fra tech-verdenen – opsummeret og sorteret efter relevans for danske virksomheder.",
};

// Placeholder news items - will be replaced with database content
const placeholderNews = [
  {
    id: "1",
    title: "OpenAI lancerer ny GPT-model med bedre dansk understøttelse",
    summary: "Den nye model viser markant forbedring i forståelse og generering af dansk tekst, hvilket gør den mere relevant for danske virksomheder.",
    source: "TLDR AI",
    sourceUrl: "https://tldr.tech/ai",
    publishedAt: "2025-01-06",
    relevanceScore: 0.92,
    categories: ["AI", "Sprogmodeller"],
  },
  {
    id: "2",
    title: "EU's AI Act træder i kraft – hvad betyder det for din virksomhed?",
    summary: "De nye EU-regler for AI stiller krav til transparens og risikostyring. Her er de vigtigste punkter, du skal kende.",
    source: "TLDR EU",
    sourceUrl: "https://tldr.tech",
    publishedAt: "2025-01-05",
    relevanceScore: 0.88,
    categories: ["Regulering", "EU"],
  },
  {
    id: "3",
    title: "Microsoft integrerer Copilot dybere i Office-pakken",
    summary: "Nye funktioner gør det lettere at bruge AI direkte i Word, Excel og PowerPoint uden at forlade programmerne.",
    source: "TLDR Tech",
    sourceUrl: "https://tldr.tech",
    publishedAt: "2025-01-04",
    relevanceScore: 0.85,
    categories: ["Produktivitet", "Microsoft"],
  },
];

export default function NyhederPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight font-heading">Nyheder</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            AI-kuraterede teknyheder – opsummeret og vurderet efter relevans for danske virksomheder.
            Opdateres dagligt baseret på TLDR-nyhedsbreve og andre kilder.
          </p>
        </div>

        {/* Info banner */}
        <Card className="mb-8 bg-muted/50 border-dashed">
          <CardContent className="py-4">
            <p className="text-sm text-muted-foreground text-center">
              Nyhederne nedenfor er eksempler. Den automatiske nyhedskuratering kommer snart.
            </p>
          </CardContent>
        </Card>

        {/* News list */}
        <div className="space-y-6">
          {placeholderNews.map((news) => (
            <Card key={news.id} className="transition-colors hover:bg-muted/50">
              <CardHeader>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <time dateTime={news.publishedAt}>
                      {new Date(news.publishedAt).toLocaleDateString("da-DK", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </time>
                    <span>·</span>
                    <a
                      href={news.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {news.source}
                    </a>
                  </div>
                  <Badge variant="outline" className="shrink-0">
                    {Math.round(news.relevanceScore * 100)}% relevant
                  </Badge>
                </div>
                <CardTitle className="text-xl leading-tight">{news.title}</CardTitle>
                <CardDescription className="text-base">
                  {news.summary}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {news.categories.map((category) => (
                    <Badge key={category} variant="secondary">
                      {category}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer info */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            Nyhederne er automatisk udvalgt og opsummeret af AI baseret på TLDR-nyhedsbreve.
            Relevansscore angiver, hvor relevant nyheden vurderes at være for danske virksomheder.
          </p>
        </div>
      </div>
    </div>
  );
}
