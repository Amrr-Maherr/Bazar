import { useQuery } from "@tanstack/react-query";
import { getSubjectBooks } from "@/services/openlibrary/openlibrary";
import type { OpenLibraryWork } from "@/types/openlibrary";

export function useCategoryBooks(categoryKey: string, limit = 50) {
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
