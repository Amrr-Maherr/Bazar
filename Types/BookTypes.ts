export type Person = {
    name: string;
    birth_year?: number | null;
    death_year?: number | null;
};

export type BookDetails = {
    id: number;
    title: string;

    // People
    authors: Person[];
    translators?: Person[];
    editors?: Person[];

    // Metadata
    subjects?: string[];
    bookshelves?: string[];
    languages?: string[];
    summaries?: string[];

    copyright?: boolean | null;
    media_type?: string;
    download_count?: number;

    // Formats
    formats: Record<string, string>;

    // Extra fields returned by the API
    bookshelves_ids?: number[];
    authors_ids?: number[];
    translators_ids?: number[];
    editors_ids?: number[];

    // API internal info (optional)
    type?: string;
};

export type BooksResponse = {
    count: number;
    next: string | null;
    previous: string | null;
    results: BookDetails[];
};
