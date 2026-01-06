import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Kontakt",
  description: "Kontakt phugl for en uforpligtende snak om AI i jeres organisation.",
};

export default function KontaktPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl font-heading">Skal vi snakke?</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Ring, skriv eller book et møde. Ingen salgstale – bare en ærlig snak om, hvad der giver mening for jer.
          </p>
        </div>

        {/* Contact options */}
        <div className="grid gap-6">
          {/* Book møde */}
          <Card className="border-primary">
            <CardHeader>
              <CardTitle className="font-heading">Book en snak</CardTitle>
              <CardDescription>
                Find en ledig tid i kalenderen – det er gratis og uforpligtende.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <a
                  href="https://calendly.com/andreaslausen"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Find en tid
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* Direct contact */}
          <Card>
            <CardHeader>
              <CardTitle className="font-heading">Skriv eller ring</CardTitle>
              <CardDescription>
                Jeg svarer så hurtigt jeg kan – som regel samme dag.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" asChild className="w-full justify-start">
                <a href="mailto:andreas@phugl.dk" className="flex items-center gap-2">
                  <span className="text-muted-foreground">Email:</span>
                  andreas@phugl.dk
                </a>
              </Button>
              <Button variant="outline" asChild className="w-full justify-start">
                <a href="tel:+4528725842" className="flex items-center gap-2">
                  <span className="text-muted-foreground">Telefon:</span>
                  28 72 58 42
                </a>
              </Button>
              <Button variant="outline" asChild className="w-full justify-start">
                <a
                  href="https://linkedin.com/in/andreaslausen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <span className="text-muted-foreground">LinkedIn:</span>
                  andreaslausen
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Info */}
        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>phugl · CVR 43975889 · Middelfart</p>
        </div>
      </div>
    </div>
  );
}
