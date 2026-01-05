import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata = {
  title: "Om mig",
  description: "Lær mere om Andreas Lausen - AI-konsulent med fokus på offentlig sektor.",
};

export default function OmPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Om mig</h1>

        {/* Intro */}
        <div className="mt-8 prose prose-lg dark:prose-invert max-w-none">
          <p className="text-xl text-muted-foreground">
            Jeg hedder Andreas Lausen og arbejder som AI-konsulent med særligt fokus på
            offentlig sektor og velfærdsområdet.
          </p>

          <h2>Min baggrund</h2>
          <p>
            Med en baggrund i både teknologi og politik har jeg en unik position til at
            forstå de udfordringer og muligheder, der ligger i at implementere AI i
            offentlige organisationer.
          </p>
          <p>
            Jeg har arbejdet med AI-projekter i kommuner, regioner og statslige
            organisationer, og har set både succeser og fejlslagne projekter. Det har
            givet mig en dyb forståelse for, hvad der skal til for at få AI til at
            skabe reel værdi.
          </p>

          <h2>Min tilgang</h2>
          <p>
            Jeg tror på, at AI skal implementeres ansvarligt og med mennesket i centrum.
            Det handler ikke om at erstatte medarbejdere, men om at frigøre tid til det
            arbejde, der virkelig kræver menneskelig indsigt og empati.
          </p>
          <p>Konkret betyder det, at jeg:</p>
          <ul>
            <li>Starter med at forstå jeres behov og udfordringer</li>
            <li>Fokuserer på praktiske løsninger frem for teknologisk hype</li>
            <li>Inddrager medarbejdere tidligt i processen</li>
            <li>Tager etik og ansvarlig AI alvorligt</li>
            <li>Leverer resultater, ikke bare PowerPoints</li>
          </ul>

          <h2>Udover arbejdet</h2>
          <p>
            Når jeg ikke arbejder med AI, er jeg engageret i lokalpolitik i Middelfart,
            hvor jeg sidder i byrådet for Moderaterne. Jeg brænder for at gøre en
            forskel - både gennem teknologi og gennem politik.
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
