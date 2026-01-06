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
            Hej. Jeg hedder Andreas, men de fleste kalder mig phugl (med ph).
          </p>

          <p>
            Det startede som et øgenavn fra håndboldholdet. I dag er det blevet mit brand –
            og min tilgang til arbejdet: at tage noget, der virker tungt og uoverskueligt,
            og gøre det lettere i praksis.
          </p>

          <p>
            Jeg hjælper virksomheder og organisationer med at få AI til at fungere i hverdagen.
            Ikke de vilde science fiction-ting – bare de værktøjer, der rent faktisk sparer tid
            og gør arbejdet nemmere. Trygt, konkret og uden hype.
          </p>

          <h2 className="text-2xl font-bold text-foreground pt-4 font-heading">Sådan arbejder jeg</h2>

          <p>
            Jeg starter altid med at forstå, hvad I faktisk laver i hverdagen. Hvad tager tid?
            Hvad er frustrerende? Hvad ville I ønske, I havde mere tid til?
          </p>

          <p>
            Derefter finder vi sammen ud af, hvor AI kan hjælpe – og hvor det ikke kan.
            For nogle gange er svaret, at I ikke har brug for AI. Det siger jeg også.
          </p>

          <p>
            Når vi har fundet de rigtige steder, bygger vi det ind i jeres arbejdsgange,
            så det bliver en naturlig del af hverdagen. Ikke et ekstra system at huske på.
          </p>

          <h2 className="text-2xl font-bold text-foreground pt-4 font-heading">Baggrund</h2>

          <p>
            Jeg har arbejdet med AI i kommuner, regioner og private virksomheder.
            Jeg har set projekter, der gik rigtig godt – og projekter, der gik i vasken.
            Det har lært mig, hvad der faktisk skal til for at få det til at virke.
          </p>

          <p>
            Ved siden af arbejdet med AI sidder jeg i byrådet i Middelfart for Moderaterne.
            Så jeg ved også lidt om, hvordan den offentlige sektor fungerer indefra.
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
