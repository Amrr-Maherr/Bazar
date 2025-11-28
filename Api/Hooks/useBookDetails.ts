import axios, { AxiosError } from 'axios';

// Define the props for the hook
// WORK_ID is optional because the function can handle missing IDs
type BookDetailsProp = {
    WORK_ID?: string;
};

// Define the structure of the book details returned by Open Library API
type BookDetails = {
    title: string; // Book title
    description?: string | { value: string }; // Description can be string or object with value
    subjects?: string[]; // List of subjects/categories
    covers?: number[]; // List of cover image IDs
    authors?: { author: { key: string } }[]; // List of authors with their keys
};

// Async function to fetch book details using the WORK_ID
const useBookDetails = async ({ WORK_ID }: BookDetailsProp): Promise<BookDetails | null> => {
    // Return null immediately if no WORK_ID is provided
    if (!WORK_ID) return null;

    try {
        // Make GET request to Open Library API for the specified book work
        const response = await axios.get<BookDetails>(`https://openlibrary.org/works/${WORK_ID}.json`);

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
