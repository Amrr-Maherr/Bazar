import { useQuery } from "@tanstack/react-query";
import { getWorkDetails, getWorkEditions, getAuthorDetails, getCoverUrl } from "@/services/openlibrary/openlibrary";
import type { WorkDetails, BookEdition, AuthorDetails } from "@/types/openlibrary";

export function useWorkWithEditions(workId: string) {
  return useQuery({
    queryKey: ["workWithEditions", workId],
    queryFn: async () => {
      const [work, editionsResponse] = await Promise.all([
        getWorkDetails(workId),
        getWorkEditions(workId, 15),
      ]);

      let author: AuthorDetails | null = null;
      if (work.authors?.[0]?.author?.key) {
        try {
          author = await getAuthorDetails(work.authors[0].author.key);
        } catch {
          author = null;
        }
      }

      const coverId = work.covers?.[0];

      return {
        work,
        author,
        coverUrl: coverId ? getCoverUrl(coverId, "L") ?? null : null,
        editions: editionsResponse.entries ?? [],
        editionsTotal: editionsResponse.size ?? 0,
      };
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 2,
  });
}

export type WorkWithEditionsData = {
  work: WorkDetails;
  author: AuthorDetails | null;
  coverUrl: string | null;
  editions: BookEdition[];
  editionsTotal: number;
};
