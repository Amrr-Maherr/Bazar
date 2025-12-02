import { BookDetails } from '@/Data/Books';
import axios, { AxiosError } from 'axios';

export const fetchBooksBySearch = async (query: string): Promise<BookDetails[] | null> => {
  if (!query.trim()) return null;

  try {
    const response = await axios.get<{ results: BookDetails[] }>(`https://gutendex.com/books?search=${encodeURIComponent(query)}`);
    return response.data.results;
  } catch (error) {
    const err = error as AxiosError;
    console.log('Error searching books:', err.message);
    return null;
  }
};
