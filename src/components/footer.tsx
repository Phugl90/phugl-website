import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const footerLinks = {
  services: [
    { name: "AI-strategi", href: "/ydelser#strategi" },
    { name: "Implementering", href: "/ydelser#implementering" },
    { name: "Workshops", href: "/ydelser#workshops" },
    { name: "Rådgivning", href: "/ydelser#raadgivning" },
  ],
  company: [
    { name: "Om mig", href: "/om" },
    { name: "Blog", href: "/blog" },
    { name: "Kontakt", href: "/kontakt" },
  ],
  legal: [
    { name: "Privatlivspolitik", href: "/privatliv" },
    { name: "Cookies", href: "/cookies" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="text-xl font-bold">
              Visionair Velfair
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              AI-konsulentvirksomhed med fokus på ansvarlig implementering i offentlige og private organisationer.
            </p>
          </div>

          {/* Ydelser */}
          <div>
            <h3 className="font-semibold">Ydelser</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Virksomhed */}
          <div>
            <h3 className="font-semibold">Virksomhed</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontakt */}
          <div>
            <h3 className="font-semibold">Kontakt</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="mailto:andreas@visionairvelfair.dk" className="hover:text-foreground">
                  andreas@visionairvelfair.dk
                </a>
              </li>
              <li>
                <a href="https://linkedin.com/in/andreaslausen" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Visionair Velfair. Alle rettigheder forbeholdes.
          </p>
          <div className="flex space-x-4">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
