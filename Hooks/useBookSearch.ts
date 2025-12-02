import { fetchBooksBySearch } from "@/Api/useBookSearch";
import { useQuery } from "@tanstack/react-query";

export const useBookSearch = (searchTerm: string) => {
    return useQuery({
        queryKey: ['searchBooks', searchTerm],
        queryFn: () => fetchBooksBySearch(searchTerm),
        enabled: !!searchTerm,
        retry: 2,
    });
};
