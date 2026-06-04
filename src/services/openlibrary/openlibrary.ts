import api from "@/services/api/api";
import type { TrendingResponse, SubjectResponse, SearchResponse } from "@/types/openlibrary";

const COVER_BASE = "https://covers.openlibrary.org/b/id";

export function getCoverUrl(coverId: number | undefined, size: "S" | "M" | "L" = "M"): string | undefined {
  if (!coverId) return undefined;
  return `${COVER_BASE}/${coverId}-${size}.jpg`;
}

export async function getTrending(limit = 10): Promise<TrendingResponse> {
  const { data } = await api.get(`/trending/daily.json?limit=${limit}`);
  return data;
}

export async function getSubjectBooks(subject: string, limit = 20): Promise<SubjectResponse> {
  const { data } = await api.get(`/subjects/${subject}.json?limit=${limit}`);
  return data;
}

export async function getNewReleases(limit = 10): Promise<SearchResponse> {
  const { data } = await api.get(`/search.json?q=subject:fiction&sort=new&limit=${limit}`);
  return data;
}

export const HOME_CATEGORIES = [
  { key: "fiction", label: "Fiction", icon: "book" },
  { key: "fantasy", label: "Fantasy", icon: "sparkles" },
  { key: "romance", label: "Romance", icon: "heart" },
  { key: "science_fiction", label: "Sci-Fi", icon: "rocket" },
  { key: "mystery", label: "Mystery", icon: "search" },
  { key: "history", label: "History", icon: "time" },
  { key: "biography", label: "Biography", icon: "person" },
  { key: "self_help", label: "Self Help", icon: "bulb" },
] as const;

export const CATEGORY_ICONS: Record<string, string> = {
  fiction: "book",
  fantasy: "sparkles",
  romance: "heart",
  science_fiction: "rocket",
  mystery: "search",
  history: "time",
  biography: "person",
  self_help: "bulb",
};
