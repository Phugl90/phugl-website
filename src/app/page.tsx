import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const services = [
  {
    title: "Implementering",
    description: "I ved, at I skal \"gøre noget med AI\", men hvad? Jeg hjælper jer med at finde de 2-3 værktøjer, der faktisk giver mening – og får dem til at virke.",
    href: "/ydelser#implementering",
  },
  {
    title: "Arbejdsgange",
    description: "AI skal ikke være et ekstra system at holde styr på. Jeg bygger det ind i det, I allerede gør – så det sparer tid i stedet for at tage den.",
    href: "/ydelser#arbejdsgange",
  },
  {
    title: "Workshops",
    description: "Ikke death by PowerPoint. Hands-on med de værktøjer, I kommer til at bruge. Alle går hjem med noget, de kan bruge dagen efter.",
    href: "/ydelser#workshops",
  },
  {
    title: "Governance",
    description: "\"Må vi bruge ChatGPT?\" – Jeg hjælper jer med at lave retningslinjer, der giver tryghed uden at kvæle initiativet.",
    href: "/ydelser#governance",
  },
];

// Placeholder news - will be fetched from API
const latestNews = [
  {
    id: "1",
    title: "OpenAI lancerer ny GPT-model med bedre dansk understøttelse",
    summary: "Den nye model viser markant forbedring i forståelse og generering af dansk tekst.",
    source: "TLDR AI",
    publishedAt: "2025-01-06",
    categories: ["AI", "Sprogmodeller"],
  },
  {
    id: "2",
    title: "EU's AI Act træder i kraft – hvad betyder det for din virksomhed?",
    summary: "De nye EU-regler stiller krav til transparens og risikostyring.",
    source: "TLDR EU",
    publishedAt: "2025-01-05",
    categories: ["Regulering", "EU"],
  },
  {
    id: "3",
    title: "Microsoft integrerer Copilot dybere i Office-pakken",
    summary: "Nye funktioner gør det lettere at bruge AI direkte i Word, Excel og PowerPoint.",
    source: "TLDR Tech",
    publishedAt: "2025-01-04",
    categories: ["Produktivitet", "Microsoft"],
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero section */}
      <section className="container mx-auto px-4 py-24 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl font-heading">
            AI, der letter din hverdag
          </h1>
          <p className="mt-6 text-lg text-muted-foreground md:text-xl">
            Jeg hjælper dig med at få AI til at fungere i hverdagen.
            Uden buzzwords. Uden magic. Bare noget, der virker.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/kontakt">Skal vi snakke?</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/ydelser">Se hvad jeg laver</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Values section */}
      <section className="border-y bg-muted/50">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            Trygt og konkret · Virker mandag morgen · Uden hype · Mindre bøvl, mere luft
          </p>
        </div>
      </section>

      {/* Services section */}
      <section className="container mx-auto px-4 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-heading">
            Hvad jeg kan hjælpe med
          </h2>
          <p className="mt-4 text-muted-foreground">
            De fleste ved godt, at AI er noget, de burde kigge på.
            Men det er svært at vide, hvor man skal starte – og hvad der faktisk giver mening.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl gap-6 md:grid-cols-2">
          {services.map((service) => (
            <Card key={service.title} className="relative overflow-hidden hover:border-primary/50 transition-colors">
              <CardHeader>
                <CardTitle className="font-heading">{service.title}</CardTitle>
                <CardDescription className="text-base">{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Link
                  href={service.href}
                  className="text-sm font-medium text-primary underline hover:no-underline"
                >
                  Læs mere
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Latest News section */}
      <section className="border-t bg-muted/50">
        <div className="container mx-auto px-4 py-24">
          <div className="mx-auto max-w-4xl">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold tracking-tight font-heading">
                  Seneste nyheder
                </h2>
                <p className="mt-2 text-muted-foreground">
                  AI-kuraterede teknyheder – sorteret efter relevans for danske virksomheder.
                </p>
              </div>
              <Button variant="outline" asChild className="hidden sm:flex">
                <Link href="/nyheder">Se alle nyheder</Link>
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {latestNews.map((news) => (
                <Card key={news.id} className="flex flex-col">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                      <span>{news.source}</span>
                      <span>·</span>
                      <time dateTime={news.publishedAt}>
                        {new Date(news.publishedAt).toLocaleDateString("da-DK", {
                          month: "short",
                          day: "numeric",
                        })}
                      </time>
                    </div>
                    <CardTitle className="text-base leading-tight">{news.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col justify-between">
                    <CardDescription className="text-sm mb-3">{news.summary}</CardDescription>
                    <div className="flex flex-wrap gap-1">
                      {news.categories.map((category) => (
                        <Badge key={category} variant="secondary" className="text-xs">
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 text-center sm:hidden">
              <Button variant="outline" asChild>
                <Link href="/nyheder">Se alle nyheder</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="border-t bg-muted/50">
        <div className="container mx-auto px-4 py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-heading">
              Lyder det relevant?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Ring eller skriv, så tager vi en snak. Ingen salgstale –
              bare en ærlig vurdering af, om jeg kan hjælpe jer.
            </p>
            <div className="mt-10">
              <Button size="lg" asChild>
                <Link href="/kontakt">Skriv til mig</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
