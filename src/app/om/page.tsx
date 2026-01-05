import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata = {
  title: "Om phugl",
  description: "phugl startede som et øgenavn, jeg tog ejerskab over. I dag er det mit arbejde: at gøre AI brugbart og trygt i hverdagen.",
};

export default function OmPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl font-heading">Om phugl</h1>

        {/* Content */}
        <div className="mt-8 space-y-6 text-lg text-muted-foreground">
          <p className="text-xl text-foreground">
            Jeg er Andreas – også kendt som phugl (med ph).
          </p>

          <p>
            phugl startede som et øgenavn, jeg tog ejerskab over. I dag er det mit arbejde:
            at tage noget, der virker tungt og uoverskueligt, og gøre det lettere i praksis.
          </p>

          <p>
            Jeg hjælper organisationer med at få AI til at virke i hverdagen – trygt,
            konkret og uden hype. Vi kradser i overfladen af potentialet, men vi gør det brugbart.
            Ikke smartere for smarthedens skyld – bare mere overskud, mere kvalitet og mindre bøvl.
          </p>

          <h2 className="text-2xl font-bold text-foreground pt-4 font-heading">Min tilgang</h2>

          <p>
            Jeg tror på, at løsninger skal virke mandag morgen. Det handler ikke om de nyeste
            buzzwords eller de mest avancerede modeller. Det handler om at finde de steder,
            hvor AI rent faktisk skaber værdi for jer.
          </p>

          <p>Konkret betyder det, at jeg:</p>

          <ul className="space-y-2 pl-4">
            <li className="flex items-start gap-3">
              <span className="text-primary mt-1">·</span>
              <span>Starter med at forstå jeres behov og hverdag</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary mt-1">·</span>
              <span>Fokuserer på praktiske løsninger frem for teknologisk hype</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary mt-1">·</span>
              <span>Inddrager medarbejdere tidligt i processen</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary mt-1">·</span>
              <span>Bygger rammer og struktur for tryg brug</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary mt-1">·</span>
              <span>Leverer resultater, ikke bare PowerPoints</span>
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-foreground pt-4 font-heading">Baggrund</h2>

          <p>
            Jeg har arbejdet med AI-projekter i kommuner, regioner og private organisationer.
            Jeg har set både succeser og fejlslagne projekter – og det har givet mig en dyb
            forståelse for, hvad der skal til for at få AI til at skabe reel værdi.
          </p>

          <p>
            Udover arbejdet med AI sidder jeg i byrådet i Middelfart for Moderaterne.
            Jeg brænder for at gøre en forskel – både gennem teknologi og gennem politik.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4">
          <Button size="lg" asChild>
            <Link href="/kontakt">Lad os tale sammen</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="https://linkedin.com/in/andreaslausen" target="_blank">
              Se min LinkedIn
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
