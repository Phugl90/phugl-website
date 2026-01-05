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
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl font-heading">Kontakt</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Lad os tage en snak om, hvordan jeg kan hjælpe jer med AI.
          </p>
        </div>

        {/* Contact options */}
        <div className="grid gap-6">
          {/* Book møde */}
          <Card className="border-primary">
            <CardHeader>
              <CardTitle className="font-heading">Book et møde</CardTitle>
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

          {/* Email */}
          <Card>
            <CardHeader>
              <CardTitle className="font-heading">Email</CardTitle>
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

          {/* Telefon */}
          <Card>
            <CardHeader>
              <CardTitle className="font-heading">Telefon</CardTitle>
              <CardDescription>
                Ring eller skriv på SMS – jeg svarer, når jeg kan.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" asChild className="w-full">
                <a href="tel:+4528725842">
                  28 72 58 42
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* LinkedIn */}
          <Card>
            <CardHeader>
              <CardTitle className="font-heading">LinkedIn</CardTitle>
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
        </div>

        {/* Info */}
        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>
            <strong>phugl</strong>
          </p>
          <p>CVR: 43975889</p>
          <p>Middelfart, Danmark</p>
        </div>
      </div>
    </div>
  );
}
