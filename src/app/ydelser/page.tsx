import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata = {
  title: "Ydelser",
  description: "Mine AI-konsulentydelser: strategi, implementering, workshops og løbende rådgivning.",
};

const services = [
  {
    id: "strategi",
    title: "AI-strategi",
    icon: "🎯",
    description: "Udvikling af en klar AI-strategi tilpasset jeres organisation",
    details: [
      "Analyse af nuværende processer og potentiale for AI",
      "Identificering af use cases med højest værdi",
      "Roadmap for implementering",
      "Vurdering af risici og etiske overvejelser",
      "Business case og ROI-beregning",
    ],
  },
  {
    id: "implementering",
    title: "Implementering",
    icon: "🚀",
    description: "Hands-on hjælp til at få AI-løsninger i drift",
    details: [
      "Valg af teknologi og leverandører",
      "Projektledelse og koordinering",
      "Integration med eksisterende systemer",
      "Test og kvalitetssikring",
      "Udrulning og change management",
    ],
  },
  {
    id: "workshops",
    title: "Workshops",
    icon: "🎓",
    description: "Praktiske workshops der giver jeres medarbejdere AI-kompetencer",
    details: [
      "Introduktion til AI for ledere",
      "Hands-on med ChatGPT og andre værktøjer",
      "Prompt engineering workshop",
      "AI-etik og ansvarlig brug",
      "Tilpassede workshops til jeres behov",
    ],
  },
  {
    id: "raadgivning",
    title: "Rådgivning",
    icon: "💡",
    description: "Løbende sparring og rådgivning om AI",
    details: [
      "Månedlig sparring om AI-trends",
      "Review af AI-initiativer",
      "Hjælp til vendor-evaluering",
      "Teknisk due diligence",
      "Ad-hoc rådgivning efter behov",
    ],
  },
];

export default function YdelserPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Ydelser</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Fra strategi til implementering - jeg hjælper jer hele vejen med AI.
          </p>
        </div>

        {/* Services */}
        <div className="space-y-12">
          {services.map((service) => (
            <Card key={service.id} id={service.id} className="scroll-mt-20">
              <CardHeader>
                <div className="text-4xl mb-2">{service.icon}</div>
                <CardTitle className="text-2xl">{service.title}</CardTitle>
                <CardDescription className="text-base">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.details.map((detail) => (
                    <li key={detail} className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span className="text-muted-foreground">{detail}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold">Interesseret?</h2>
          <p className="mt-2 text-muted-foreground">
            Book en gratis samtale, så vi kan tale om jeres behov.
          </p>
          <Button size="lg" className="mt-6" asChild>
            <Link href="/kontakt">Kontakt mig</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
