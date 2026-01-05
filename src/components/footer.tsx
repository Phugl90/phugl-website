import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const footerLinks = {
  services: [
    { name: "Implementering", href: "/ydelser#implementering" },
    { name: "Arbejdsgange", href: "/ydelser#arbejdsgange" },
    { name: "Workshops", href: "/ydelser#workshops" },
    { name: "Governance", href: "/ydelser#governance" },
  ],
  company: [
    { name: "Om phugl", href: "/om" },
    { name: "Blog", href: "/blog" },
    { name: "Kontakt", href: "/kontakt" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t bg-[#393634] text-white/90">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="text-xl font-semibold font-heading">
              phugl
            </Link>
            <p className="mt-4 text-sm text-white/70">
              AI, der letter din hverdag. Trygt, konkret og uden hype.
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
                    className="text-sm text-white/70 hover:text-white hover:underline"
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
                    className="text-sm text-white/70 hover:text-white hover:underline"
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
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li>
                <a href="mailto:andreas@visionairvelfair.dk" className="hover:text-white hover:underline">
                  andreas@visionairvelfair.dk
                </a>
              </li>
              <li>
                <a href="tel:+4528725842" className="hover:text-white hover:underline">
                  28 72 58 42
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/andreaslausen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white hover:underline"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-white/20" />

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-white/60">
            © {new Date().getFullYear()} phugl · CVR 43975889
          </p>
        </div>
      </div>
    </footer>
  );
}
