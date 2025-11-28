import { BookDetails } from '@/Types/BookDetails';
import axios, { AxiosError } from 'axios';

// Define the props for the hook
// WORK_ID is optional because the function can handle missing IDs
type BookDetailsProp = {
    Query?: string;
};

// Async function to fetch book details using the WORK_ID
const useBookDetails = async ({ Query }: BookDetailsProp): Promise<BookDetails | null> => {
    // Return null immediately if no WORK_ID is provided
    if (!Query) return null;

    try {
        // Make GET request to Open Library API for the specified book work
        const response = await axios.get<BookDetails>(`https://gutendex.com/books?search=${Query}`);
        // Return the data from the API response
        return response.data;
    } catch (error) {
        // If there's an error, cast it to AxiosError to access the message
        const err = error as AxiosError;
        console.log('Error fetching book details:', err.message);

        // Return null if fetching fails
        return null;
    }
};

// Export the function for use in other components
export default useBookDetails;
