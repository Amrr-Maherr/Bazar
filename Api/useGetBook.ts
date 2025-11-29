import { BooksResponse } from '@/Data/Books';
import axios, { AxiosError } from 'axios';

export const fetchBooks = async (): Promise<BooksResponse | null> => {
    try {
        const response = await axios.get<BooksResponse>('https://gutendex.com/books');
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.log('Error fetching books:', err.message);
        return null;
    }
};

