import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const services = [
  {
    title: "AI-strategi",
    description: "Udvikling af en klar AI-strategi der passer til jeres organisation og mål.",
    icon: "🎯",
  },
  {
    title: "Implementering",
    description: "Hands-on hjælp til at implementere AI-løsninger i jeres daglige arbejde.",
    icon: "🚀",
  },
  {
    title: "Workshops",
    description: "Praktiske workshops der giver jeres medarbejdere AI-kompetencer.",
    icon: "🎓",
  },
  {
    title: "Rådgivning",
    description: "Løbende rådgivning om AI-trends, muligheder og ansvarlig brug.",
    icon: "💡",
  },
];

const features = [
  "Erfaring med offentlig sektor",
  "Fokus på ansvarlig AI",
  "Praktisk implementering",
  "Dansk og engelsksproget",
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero section */}
      <section className="container mx-auto px-4 py-24 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="secondary" className="mb-4">
            AI-konsulent
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            AI der skaber værdi for mennesker
          </h1>
          <p className="mt-6 text-lg text-muted-foreground md:text-xl">
            Jeg hjælper offentlige og private organisationer med at implementere AI
            på en ansvarlig og effektiv måde. Fokus på praktiske løsninger der
            faktisk virker.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/kontakt">Book en gratis samtale</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/ydelser">Se ydelser</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features badges */}
      <section className="border-y bg-muted/50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-wrap items-center justify-center gap-4">
            {features.map((feature) => (
              <Badge key={feature} variant="outline" className="text-sm py-2 px-4">
                {feature}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Services section */}
      <section className="container mx-auto px-4 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Hvad jeg kan hjælpe med
          </h2>
          <p className="mt-4 text-muted-foreground">
            Fra strategi til implementering - jeg hjælper jer hele vejen.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl gap-8 md:grid-cols-2">
          {services.map((service) => (
            <Card key={service.title} className="relative overflow-hidden">
              <CardHeader>
                <div className="text-4xl mb-2">{service.icon}</div>
                <CardTitle>{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Link
                  href={`/ydelser#${service.title.toLowerCase().replace('æ', 'ae')}`}
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Læs mere →
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
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Klar til at komme i gang?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Book en gratis og uforpligtende samtale, hvor vi kan tale om jeres
              behov og hvordan AI kan skabe værdi for jer.
            </p>
            <div className="mt-10">
              <Button size="lg" asChild>
                <Link href="/kontakt">Book et møde</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
