
export type BookDetails = {
    id: number;
    title: string;
    authors: { name: string; birth_year?: number; death_year?: number }[];
    translators?: { name: string; birth_year?: number; death_year?: number }[];
    editors?: { name: string; birth_year?: number; death_year?: number }[];
    subjects?: string[];
    bookshelves?: string[];
    languages?: string[];
    copyright?: boolean | null;
    media_type?: string;
    formats: Record<string, string>;
    download_count?: number;
}

export type BooksResponse = {
    count: number;
    next: string | null;
    previous: string | null;
    results: BookDetails[];
};
