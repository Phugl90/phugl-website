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
    description: "I ved, at I skal \"gøre noget med AI\", men hvad? Jeg hjælper jer med at finde de 2-3 værktøjer, der faktisk giver mening – og får dem til at virke.",
    example: "En kommune ville gerne bruge AI til mødereferater. Vi testede tre forskellige værktøjer, fandt det bedste til deres setup, og nu sparer de 45 minutter per møde.",
    details: [
      "Vi finder ud af, hvad der passer til jer – ikke hvad der er hot lige nu",
      "I får noget, der virker fra dag ét, ikke en prototype der aldrig bliver færdig",
      "Medarbejderne bliver inddraget, så de faktisk bruger det bagefter",
    ],
  },
  {
    id: "arbejdsgange",
    title: "Arbejdsgange",
    description: "AI skal ikke være et ekstra system at holde styr på. Jeg bygger det ind i det, I allerede gør – så det sparer tid i stedet for at tage den.",
    example: "En HR-afdeling brugte timer på at skrive jobopslag. Nu starter de med et AI-udkast baseret på deres stillingsbeskrivelse, og så tilpasser de derfra. Halvdelen af tiden, bedre opslag.",
    details: [
      "Vi kortlægger, hvor I bruger tid på noget, AI kan hjælpe med",
      "AI'en lærer jeres tone og stil, så output passer til jer",
      "Det hele dokumenteres, så nye kolleger hurtigt kan komme med",
    ],
  },
  {
    id: "workshops",
    title: "Workshops",
    description: "Ikke slides på slides. Praktisk arbejde med de værktøjer, I kommer til at bruge. Alle går hjem med noget, de kan bruge dagen efter.",
    example: "En ledergruppe på 12 fik en halvdagsworkshop. Efter frokost havde alle lavet deres første AI-assisterede notat. To måneder senere brugte 10 af dem stadig værktøjerne dagligt.",
    details: [
      "I arbejder med jeres egne opgaver, ikke fiktive eksempler",
      "Alle niveauer kan være med – fra skeptikere til entusiaster",
      "Jeg følger op bagefter, så I ikke står alene med spørgsmål",
    ],
  },
  {
    id: "governance",
    title: "Governance",
    description: "\"Må vi bruge ChatGPT?\" – Jeg hjælper jer med at lave retningslinjer, der giver tryghed uden at kvæle initiativet.",
    example: "En organisation var usikker på, hvad medarbejderne måtte bruge AI til. Vi lavede en simpel politik på to sider, der både beskyttede følsomme data og gav folk frihed til at eksperimentere.",
    details: [
      "Klare regler for hvad der må deles med AI – og hvad der ikke må",
      "Tjekliste til kvalitetssikring af AI-genereret indhold",
      "En ramme der kan vokse med jer, efterhånden som I lærer mere",
    ],
  },
];

export default function YdelserPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl font-heading">Hvad jeg kan hjælpe med</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Jeg holder det simpelt: find ud af hvor AI giver mening, få det til at virke, og sørg for at folk faktisk bruger det.
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
              <CardContent className="space-y-4">
                {/* Example */}
                <div className="rounded-lg bg-muted/50 p-4">
                  <p className="text-sm font-medium text-foreground mb-1">Eksempel fra virkeligheden:</p>
                  <p className="text-sm text-muted-foreground">{service.example}</p>
                </div>

                {/* Details */}
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
          <h2 className="text-2xl font-bold font-heading">Lyder det som noget?</h2>
          <p className="mt-2 text-muted-foreground">
            Ring eller skriv, så finder vi ud af, om jeg kan hjælpe jer. Ingen forpligtelser.
          </p>
          <Button size="lg" className="mt-6" asChild>
            <Link href="/kontakt">Skal vi snakke?</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
