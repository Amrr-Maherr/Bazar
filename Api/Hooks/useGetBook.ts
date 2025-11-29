import { BooksResponse } from '@/Data/Books';
import { useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';

const fetchBooks = async (): Promise<BooksResponse | null> => {
    try {
        const response = await axios.get<BooksResponse>('https://gutendex.com/books');
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.log('Error fetching books:', err.message);
        return null;
    }
};

export const useBooks = () => {
    return useQuery({
        queryKey: ['GetAllBooks'],
        queryFn: fetchBooks,
        retry: 2,
    });
};
