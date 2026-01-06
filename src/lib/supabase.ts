import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Supabase configuration - uses the same database as AI-assistent
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Check if Supabase is configured
const isSupabaseConfigured = supabaseUrl && supabaseAnonKey;

// Public client for reading news (no auth required)
// Returns null if not configured
export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Types for news items
export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  source_url: string | null;
  original_url: string | null;
  categories: string[];
  relevance_score: number;
  blog_potential_score: number;
  published_at: string | null;
  created_at: string;
  status: string;
}

export interface BlogDraft {
  id: string;
  title: string;
  slug: string | null;
  summary: string | null;
  content_markdown: string;
  categories: string[];
  status: string;
  published_at: string | null;
  created_at: string;
}

// Fetch recent news items
export async function getRecentNews(limit = 10, minRelevance = 0.5): Promise<NewsItem[]> {
  if (!supabase) {
    console.warn("Supabase not configured, returning empty news");
    return [];
  }

  const { data, error } = await supabase
    .from("news_items")
    .select("*")
    .gte("relevance_score", minRelevance)
    .neq("status", "archived")
    .order("published_at", { ascending: false, nullsFirst: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching news:", error);
    return [];
  }

  return data || [];
}

// Fetch news by category
export async function getNewsByCategory(category: string, limit = 10): Promise<NewsItem[]> {
  if (!supabase) {
    console.warn("Supabase not configured, returning empty news");
    return [];
  }

  const { data, error } = await supabase
    .from("news_items")
    .select("*")
    .contains("categories", [category])
    .neq("status", "archived")
    .order("published_at", { ascending: false, nullsFirst: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching news by category:", error);
    return [];
  }

  return data || [];
}

// Fetch published blog posts
export async function getPublishedBlogPosts(limit = 10): Promise<BlogDraft[]> {
  if (!supabase) {
    console.warn("Supabase not configured, returning empty blog posts");
    return [];
  }

  const { data, error } = await supabase
    .from("blog_drafts")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false, nullsFirst: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }

  return data || [];
}
