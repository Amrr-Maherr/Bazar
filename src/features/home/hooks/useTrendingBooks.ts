import { useQuery } from "@tanstack/react-query";
import { getTrending } from "@/services/openlibrary/openlibrary";
import type { OpenLibraryWork } from "@/types/openlibrary";

export function useTrendingDaily() {
  return useQuery<OpenLibraryWork[]>({
    queryKey: ["trending", "daily"],
    queryFn: async () => {
      const response = await getTrending(10);
      return response.works ?? [];
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 2,
  });
}
