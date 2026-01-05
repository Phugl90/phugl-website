import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Kontakt",
  description: "Kontakt Andreas Lausen for en snak om AI-konsulentydelser.",
};

export default function KontaktPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Kontakt</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Lad os tage en snak om, hvordan jeg kan hjælpe jer med AI.
          </p>
        </div>

        {/* Contact options */}
        <div className="grid gap-6">
          {/* Email */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">📧</span>
                Email
              </CardTitle>
              <CardDescription>
                Send mig en email, så vender jeg tilbage hurtigst muligt.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" asChild className="w-full">
                <a href="mailto:andreas@visionairvelfair.dk">
                  andreas@visionairvelfair.dk
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* LinkedIn */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">💼</span>
                LinkedIn
              </CardTitle>
              <CardDescription>
                Forbind med mig på LinkedIn for nyheder og artikler.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" asChild className="w-full">
                <a
                  href="https://linkedin.com/in/andreaslausen"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  linkedin.com/in/andreaslausen
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* Book møde */}
          <Card className="border-primary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">📅</span>
                Book et møde
              </CardTitle>
              <CardDescription>
                Book en gratis og uforpligtende samtale direkte i min kalender.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <a
                  href="https://calendly.com/andreaslausen"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Book tid i kalenderen
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Info */}
        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>
            <strong>Visionair Velfair</strong>
          </p>
          <p>CVR: [Indsæt CVR]</p>
          <p>Middelfart, Danmark</p>
        </div>
      </div>
    </div>
  );
}
