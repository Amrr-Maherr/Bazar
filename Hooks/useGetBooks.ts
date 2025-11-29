import { fetchBooks } from "@/Api/useGetBook";
import { useQuery } from "@tanstack/react-query";

export const useBooks = () => {
    return useQuery({
        queryKey: ['GetAllBooks'],
        queryFn: fetchBooks,
        retry: 2,
    });
};