import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const services = [
  {
    title: "Implementering",
    description: "Få AI til at virke i praksis. Ingen PowerPoints – bare løsninger der fungerer mandag morgen.",
    href: "/ydelser#implementering",
  },
  {
    title: "Arbejdsgange",
    description: "Byg AI ind i jeres daglige rutiner, så det skaber mere luft og mindre bøvl.",
    href: "/ydelser#arbejdsgange",
  },
  {
    title: "Workshops",
    description: "Praktisk læring der giver jeres medarbejdere konkrete færdigheder – ikke bare teori.",
    href: "/ydelser#workshops",
  },
  {
    title: "Governance",
    description: "Rammer og struktur for ansvarlig AI-brug. Kvalitetssikring I kan stole på.",
    href: "/ydelser#governance",
  },
];

const values = [
  "Trygt og konkret",
  "Virker mandag morgen",
  "Uden hype",
  "Mindre bøvl, mere luft",
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
            phugl gør AI brugbart og trygt i hverdagen – så arbejdet bliver lettere.
            Implementering, arbejdsgange, governance og kvalitetssikring.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/kontakt">Lad os tale sammen</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/ydelser">Se hvad jeg kan hjælpe med</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Values section */}
      <section className="border-y bg-muted/50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            {values.map((value) => (
              <span key={value} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                {value}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Services section */}
      <section className="container mx-auto px-4 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-heading">
            Hvad jeg kan hjælpe med
          </h2>
          <p className="mt-4 text-muted-foreground">
            Fra første skridt til daglig drift – jeg hjælper jer med at få AI til at virke.
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

      {/* CTA section */}
      <section className="border-t bg-muted/50">
        <div className="container mx-auto px-4 py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-heading">
              Klar til at komme i gang?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Book en uforpligtende samtale. Vi taler om jeres behov, og jeg giver
              mit ærlige bud på, hvordan AI kan skabe værdi for jer.
            </p>
            <div className="mt-10">
              <Button size="lg" asChild>
                <Link href="/kontakt">Book en samtale</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
