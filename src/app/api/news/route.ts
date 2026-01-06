import { NextResponse } from "next/server";
import { getRecentNews, getNewsByCategory, NewsItem as DbNewsItem } from "@/lib/supabase";

// API response type (camelCase for frontend)
export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  sourceUrl: string | null;
  originalUrl: string | null;
  publishedAt: string | null;
  relevanceScore: number;
  blogPotentialScore: number;
  categories: string[];
  createdAt: string;
}

// Placeholder news data - used as fallback if database is empty
const placeholderNews: NewsItem[] = [
  {
    id: "placeholder-1",
    title: "OpenAI lancerer ny GPT-model med bedre dansk understøttelse",
    summary: "Den nye model viser markant forbedring i forståelse og generering af dansk tekst, hvilket gør den mere relevant for danske virksomheder.",
    source: "TLDR AI",
    sourceUrl: "https://tldr.tech/ai",
    originalUrl: null,
    publishedAt: "2025-01-06T08:00:00Z",
    relevanceScore: 0.92,
    blogPotentialScore: 0.85,
    categories: ["AI", "Sprogmodeller"],
    createdAt: "2025-01-06T10:00:00Z",
  },
  {
    id: "placeholder-2",
    title: "EU's AI Act træder i kraft – hvad betyder det for din virksomhed?",
    summary: "De nye EU-regler for AI stiller krav til transparens og risikostyring. Her er de vigtigste punkter, du skal kende.",
    source: "TLDR EU",
    sourceUrl: "https://tldr.tech",
    originalUrl: null,
    publishedAt: "2025-01-05T08:00:00Z",
    relevanceScore: 0.88,
    blogPotentialScore: 0.92,
    categories: ["Regulering", "EU"],
    createdAt: "2025-01-05T10:00:00Z",
  },
  {
    id: "placeholder-3",
    title: "Microsoft integrerer Copilot dybere i Office-pakken",
    summary: "Nye funktioner gør det lettere at bruge AI direkte i Word, Excel og PowerPoint uden at forlade programmerne.",
    source: "TLDR Tech",
    sourceUrl: "https://tldr.tech",
    originalUrl: null,
    publishedAt: "2025-01-04T08:00:00Z",
    relevanceScore: 0.85,
    blogPotentialScore: 0.75,
    categories: ["Produktivitet", "Microsoft"],
    createdAt: "2025-01-04T10:00:00Z",
  },
];

// Transform database record to API response format
function transformNewsItem(item: DbNewsItem): NewsItem {
  return {
    id: item.id,
    title: item.title,
    summary: item.summary,
    source: item.source,
    sourceUrl: item.source_url,
    originalUrl: item.original_url,
    publishedAt: item.published_at,
    relevanceScore: item.relevance_score,
    blogPotentialScore: item.blog_potential_score,
    categories: item.categories,
    createdAt: item.created_at,
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get("limit") || "10");
  const category = searchParams.get("category");
  const minRelevance = parseFloat(searchParams.get("minRelevance") || "0.5");

  try {
    // Try to fetch from database
    let dbNews: DbNewsItem[];

    if (category) {
      dbNews = await getNewsByCategory(category, limit);
    } else {
      dbNews = await getRecentNews(limit, minRelevance);
    }

    // If we have database results, use them
    if (dbNews && dbNews.length > 0) {
      const news = dbNews.map(transformNewsItem);

      return NextResponse.json({
        news,
        meta: {
          total: news.length,
          isPlaceholder: false,
          source: "database",
        },
      });
    }

    // Fall back to placeholder data
    let news = placeholderNews
      .filter((item) => item.relevanceScore >= minRelevance)
      .filter((item) => !category || item.categories.includes(category));

    news = news.sort(
      (a, b) => new Date(b.publishedAt || "").getTime() - new Date(a.publishedAt || "").getTime()
    );

    news = news.slice(0, limit);

    return NextResponse.json({
      news,
      meta: {
        total: news.length,
        isPlaceholder: true,
        message: "Viser eksempeldata. Automatisk nyhedskuratering er under udvikling.",
      },
    });
  } catch (error) {
    console.error("Error fetching news:", error);

    // Return placeholder on error
    return NextResponse.json({
      news: placeholderNews.slice(0, limit),
      meta: {
        total: placeholderNews.length,
        isPlaceholder: true,
        error: "Kunne ikke hente nyheder fra database",
      },
    });
  }
}
