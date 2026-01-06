import { NextResponse } from "next/server";

// Types for news items
export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  sourceUrl: string;
  originalUrl?: string;
  publishedAt: string;
  relevanceScore: number;
  blogPotentialScore: number;
  categories: string[];
  processedAt: string;
}

// Placeholder news data - will be replaced with database queries
const placeholderNews: NewsItem[] = [
  {
    id: "1",
    title: "OpenAI lancerer ny GPT-model med bedre dansk understøttelse",
    summary: "Den nye model viser markant forbedring i forståelse og generering af dansk tekst, hvilket gør den mere relevant for danske virksomheder.",
    source: "TLDR AI",
    sourceUrl: "https://tldr.tech/ai",
    publishedAt: "2025-01-06T08:00:00Z",
    relevanceScore: 0.92,
    blogPotentialScore: 0.85,
    categories: ["AI", "Sprogmodeller"],
    processedAt: "2025-01-06T10:00:00Z",
  },
  {
    id: "2",
    title: "EU's AI Act træder i kraft – hvad betyder det for din virksomhed?",
    summary: "De nye EU-regler for AI stiller krav til transparens og risikostyring. Her er de vigtigste punkter, du skal kende.",
    source: "TLDR EU",
    sourceUrl: "https://tldr.tech",
    publishedAt: "2025-01-05T08:00:00Z",
    relevanceScore: 0.88,
    blogPotentialScore: 0.92,
    categories: ["Regulering", "EU"],
    processedAt: "2025-01-05T10:00:00Z",
  },
  {
    id: "3",
    title: "Microsoft integrerer Copilot dybere i Office-pakken",
    summary: "Nye funktioner gør det lettere at bruge AI direkte i Word, Excel og PowerPoint uden at forlade programmerne.",
    source: "TLDR Tech",
    sourceUrl: "https://tldr.tech",
    publishedAt: "2025-01-04T08:00:00Z",
    relevanceScore: 0.85,
    blogPotentialScore: 0.75,
    categories: ["Produktivitet", "Microsoft"],
    processedAt: "2025-01-04T10:00:00Z",
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get("limit") || "10");
  const category = searchParams.get("category");
  const minRelevance = parseFloat(searchParams.get("minRelevance") || "0");

  // Filter and limit results
  let news = placeholderNews
    .filter((item) => item.relevanceScore >= minRelevance)
    .filter((item) => !category || item.categories.includes(category));

  // Sort by publishedAt descending
  news = news.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  // Limit results
  news = news.slice(0, limit);

  return NextResponse.json({
    news,
    meta: {
      total: news.length,
      isPlaceholder: true,
      message: "Dette er placeholder-data. Den automatiske nyhedskuratering kommer snart.",
    },
  });
}
