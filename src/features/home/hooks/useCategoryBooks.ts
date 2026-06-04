import { useQuery } from "@tanstack/react-query";
import { getSubjectBooks, HOME_CATEGORIES } from "@/services/openlibrary/openlibrary";
import type { OpenLibraryWork } from "@/types/openlibrary";

export function useCategoryBooks(categoryKey: string, limit = 20) {
  return useQuery<OpenLibraryWork[]>({
    queryKey: ["categoryBooks", categoryKey, limit],
    queryFn: async () => {
      const response = await getSubjectBooks(categoryKey, limit);
      return (response.works ?? []).map((w) => ({
        key: w.key,
        title: w.title,
        cover_id: w.cover_id,
        first_publish_year: w.first_publish_year,
        author_name: w.authors?.map((a) => a.name),
        author_key: w.authors?.map((a) => a.key),
      }));
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 2,
  });
}

export function useAllCategories(limit = 6) {
  return useQuery({
    queryKey: ["allCategories", limit],
    queryFn: async () => {
      const results = await Promise.all(
        HOME_CATEGORIES.slice(0, 4).map((cat) =>
          getSubjectBooks(cat.key, limit).then((res) => ({
            category: cat.key,
            books: (res.works ?? []).map((w) => ({
              key: w.key,
              title: w.title,
              cover_id: w.cover_id,
              first_publish_year: w.first_publish_year,
              author_name: w.authors?.map((a) => a.name),
              author_key: w.authors?.map((a) => a.key),
            })),
          }))
        )
      );
      return results;
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 2,
  });
}
