import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata = {
  title: "Ydelser",
  description: "phugl hjælper med AI-implementering, arbejdsgange, workshops og governance. Trygt, konkret og uden hype.",
};

const services = [
  {
    id: "implementering",
    title: "Implementering",
    description: "Få AI til at virke i praksis – ikke bare på papiret",
    details: [
      "Vælg de rigtige værktøjer til jeres behov",
      "Byg løsninger der fungerer mandag morgen",
      "Test og kvalitetssikring inden udrulning",
      "Hjælp til at få medarbejderne med",
      "Løbende justeringer efter behov",
    ],
  },
  {
    id: "arbejdsgange",
    title: "Arbejdsgange",
    description: "Byg AI ind i jeres daglige rutiner",
    details: [
      "Identificér hvor AI skaber mest værdi",
      "Design nye arbejdsgange med AI som redskab",
      "Automatisér gentagne opgaver",
      "Frigør tid til det vigtige arbejde",
      "Dokumentation og best practices",
    ],
  },
  {
    id: "workshops",
    title: "Workshops",
    description: "Praktisk læring der giver konkrete færdigheder",
    details: [
      "Introduktion til AI for ledere og medarbejdere",
      "Hands-on med ChatGPT, Claude og andre værktøjer",
      "Prompt-teknikker der virker",
      "Ansvarlig brug og etiske overvejelser",
      "Tilpasset jeres branche og behov",
    ],
  },
  {
    id: "governance",
    title: "Governance",
    description: "Rammer og struktur for tryg AI-brug",
    details: [
      "Retningslinjer for AI-brug i organisationen",
      "Kvalitetssikring af AI-genereret indhold",
      "Risikostyring og compliance",
      "Løbende evaluering og tilpasning",
      "Tryghed for ledelse og medarbejdere",
    ],
  },
];

export default function YdelserPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl font-heading">Ydelser</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Fra første skridt til daglig drift – jeg hjælper jer med at få AI til at virke.
          </p>
        </div>

        {/* Services */}
        <div className="space-y-8">
          {services.map((service) => (
            <Card key={service.id} id={service.id} className="scroll-mt-20">
              <CardHeader>
                <CardTitle className="text-2xl font-heading">{service.title}</CardTitle>
                <CardDescription className="text-base">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.details.map((detail) => (
                    <li key={detail} className="flex items-start gap-3">
                      <span className="text-primary mt-0.5">·</span>
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
          <h2 className="text-2xl font-bold font-heading">Interesseret?</h2>
          <p className="mt-2 text-muted-foreground">
            Lad os tage en snak om, hvad der giver mening for jer.
          </p>
          <Button size="lg" className="mt-6" asChild>
            <Link href="/kontakt">Kontakt mig</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
