export interface OpenLibraryWork {
  key: string;
  title: string;
  cover_id?: number;
  cover_i?: number;
  first_publish_year?: number;
  author_name?: string[];
  author_key?: string[];
  subject?: string[];
  edition_count?: number;
  id_goodreads?: string[];
  id_librarything?: string[];
  id_amazon?: string[];
  already_read?: boolean;
}

export interface WorkDetails {
  key: string;
  title: string;
  description?: string | { type: string; value: string };
  covers?: number[];
  subjects?: string[];
  subject_places?: string[];
  subject_people?: string[];
  subject_times?: string[];
  first_publish_date?: string;
  latest_revision?: number;
  revision?: number;
  created?: { type: string; value: string };
  last_modified?: { type: string; value: string };
  authors?: { author: { key: string } }[];
  excerpts?: { excerpt: string; comment?: string }[];
}

export interface BookEdition {
  key: string;
  title: string;
  covers?: number[];
  cover_id?: number;
  publish_date?: string;
  publishers?: string[];
  physical_format?: string;
  number_of_pages?: number;
  isbn_10?: string[];
  isbn_13?: string[];
  languages?: { key: string }[];
  works?: { key: string }[];
  edition_name?: string;
  subtitle?: string;
}

export interface EditionsResponse {
  entries: BookEdition[];
  size: number;
}

export interface AuthorDetails {
  key: string;
  name: string;
  personal_name?: string;
  birth_date?: string;
  death_date?: string;
  bio?: string | { type: string; value: string };
  photos?: number[];
}

export interface TrendingResponse {
  works: OpenLibraryWork[];
}

export interface SubjectResponse {
  works: {
    key: string;
    title: string;
    cover_id?: number;
    authors?: { name: string; key: string }[];
    first_publish_year?: number;
  }[];
  name?: string;
}

export interface SearchResponse {
  docs: OpenLibraryWork[];
  num_found: number;
}

export interface Category {
  key: string;
  label: string;
  icon: string;
}
