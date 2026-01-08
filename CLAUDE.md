# phugl - Hjemmeside

Hjemmeside for phugl (phugl.dk) - AI-konsulentvirksomhed.

## Projekt Struktur

```
phugl-website/
├── content/
│   └── blog/              # Blog posts (MDX filer)
├── src/
│   ├── app/               # Next.js App Router pages
│   │   ├── page.tsx       # Forside
│   │   ├── blog/          # Blog liste og posts
│   │   ├── ydelser/       # Ydelser/services
│   │   ├── om/            # Om mig
│   │   └── kontakt/       # Kontakt
│   ├── components/
│   │   ├── ui/            # shadcn/ui komponenter
│   │   ├── header.tsx     # Navigation header
│   │   ├── footer.tsx     # Footer
│   │   └── mdx-content.tsx # MDX renderer
│   └── lib/
│       ├── blog.ts        # Blog utilities (hent posts, etc.)
│       └── utils.ts       # Generelle utilities
└── public/                # Statiske filer (billeder, etc.)
```

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Blog**: MDX filer i `content/blog/`
- **Deployment**: Vercel

## Kommandoer

```bash
npm run dev      # Start development server
npm run build    # Build til produktion
npm run start    # Start production server
```

---

## Blog System

### Opret nyt blog post

Opret en ny `.mdx` fil i `content/blog/`:

```mdx
---
title: "Din titel her"
description: "En kort beskrivelse til preview"
date: "2025-01-05"
author: "Andreas Lausen"
tags: ["AI", "Offentlig sektor"]
published: true
---

Dit indhold her i Markdown format.

## Overskrift

Tekst med **fed** og *kursiv*.

- Punkt 1
- Punkt 2

[Link til noget](/ydelser)
```

### Blog frontmatter felter

| Felt | Type | Beskrivelse |
|------|------|-------------|
| `title` | string | Titel på blog post |
| `description` | string | Kort beskrivelse (til SEO og preview) |
| `date` | string | Dato i YYYY-MM-DD format |
| `author` | string | Forfatter (default: Andreas Lausen) |
| `tags` | string[] | Tags til kategorisering |
| `image` | string | (optional) Hero billede URL |
| `published` | boolean | Om posten skal vises (default: true) |

### Gem som kladde

Sæt `published: false` for at gemme som kladde:

```yaml
---
title: "Kladde post"
published: false
---
```

---

## Sider

### Forside (`/`)
- Hero sektion med værdiproposition
- Ydelser oversigt
- CTA til kontakt

### Ydelser (`/ydelser`)
- Detaljeret beskrivelse af services
- AI-strategi, implementering, workshops, rådgivning

### Om (`/om`)
- Om Andreas og baggrund
- Tilgang til AI

### Kontakt (`/kontakt`)
- Kontaktmuligheder (email, LinkedIn)
- Book møde link

### Blog (`/blog`)
- Liste over alle publicerede posts
- Tags filter

### Blog Post (`/blog/[slug]`)
- Fuld blog post med MDX rendering
- Relaterede links

---

## Styling

### Farver (Tailwind classes)
- `bg-background` / `text-foreground` - Basis farver
- `bg-muted` / `text-muted-foreground` - Dæmpede farver
- `bg-primary` / `text-primary` - Primær farve
- `bg-card` - Kort baggrund

### Komponenter
Brug shadcn/ui komponenter fra `@/components/ui/`:
- `Button` - Knapper
- `Card` - Kort til indhold
- `Badge` - Tags og labels
- `Separator` - Skillelinjer

---

## Integration med AI-assistent

Hjemmesiden er designet til at integrere med AI-assistenten (`app.phugl.dk`).

### Automatisk blog oprettelse

AI-assistenten kan oprette blog posts ved at:
1. Generere MDX fil med korrekt frontmatter
2. Gemme i `content/blog/` mappen
3. Push til git repository

### Eksempel workflow
1. AI-assistent identificerer relevant emne
2. Opretter opgave med type "BLOG"
3. Genererer kladde som MDX
4. Bruger reviewer og godkender
5. MDX fil pushes til repo
6. Vercel deployer automatisk

### API til blog oprettelse (fremtidig)
```typescript
// POST /api/blog/create
{
  slug: "min-nye-post",
  title: "Min titel",
  description: "Beskrivelse",
  content: "Markdown indhold...",
  tags: ["AI"],
  published: false // Start som kladde
}
```

---

## Deployment

### Vercel Setup
1. Forbind GitHub repository til Vercel
2. Vælg `phugl-website` som root directory
3. Framework: Next.js (auto-detected)
4. Tilføj custom domain: `phugl.dk`

### Environment Variables
Ingen required environment variables pt.

### Build Settings
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`

---

## Vedligeholdelse

### Tilføj ny side
1. Opret mappe i `src/app/[sidenavn]/`
2. Tilføj `page.tsx`
3. Opdater navigation i `header.tsx`
4. Opdater links i `footer.tsx`

### Tilføj ny komponent
1. Brug `npx shadcn@latest add [komponent]`
2. Eller opret custom komponent i `src/components/`

### Opdater styling
- Global CSS: `src/app/globals.css`
- Tailwind config via CSS custom properties
