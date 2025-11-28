// Define the structure of the book details returned by Open Library API
export type BookDetails = {
    title: string; // Book title
    description?: string | { value: string }; // Description can be string or object with value
    subjects?: string[]; // List of subjects/categories
    covers?: number[]; // List of cover image IDs
    authors?: { author: { key: string } }[]; // List of authors with their keys
};