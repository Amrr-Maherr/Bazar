import { useQuery } from "@tanstack/react-query";
import { getNewReleases } from "@/services/openlibrary/openlibrary";
import type { OpenLibraryWork } from "@/types/openlibrary";

export function useNewReleases() {
  return useQuery<OpenLibraryWork[]>({
    queryKey: ["newReleases"],
    queryFn: async () => {
      const response = await getNewReleases(10);
      return response.docs ?? [];
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 2,
  });
}
