export type Person = {
    name: string;
    birth_year?: number | null;
    death_year?: number | null;
};

export type BookDetails = {
    id: number;
    title: string;
    authors: Person[];
    translators?: Person[];
    editors?: Person[];
    subjects?: string[];
    bookshelves?: string[];
    languages?: string[];
    copyright?: boolean | null;
    media_type?: string;
    formats: Record<string, string>;
    download_count?: number;
};
export type BooksResponse = {
    count: number;
    next: string | null;
    previous: string | null;
    results: BookDetails[];
};
