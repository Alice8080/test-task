interface Response {
    totalItems: number;
    items: ResponseItem[]
}

interface ResponseItem {
    id: string;
    volumeInfo: {
        title: string;
        authors: string[];
        categories: string[];
        description: string;
        imageLinks: {
            smallThumbnail?: string;
            thumbnail?: string;
            extraLarge?: string;
        }
    }
}

interface Book {
    id: string;
    title: string;
    authors: string[];
    categories: string[];
    description?: string;
    thumbnail?: string;
    smallThumbnail: string;
}

interface Params {
    query: null | string;
    category: null | string;
    sorting: null | string;
    offset: null | number;
}

interface SearchResultProps {
    result: Book[],
}

export type { Response, Book, Params, ResponseItem, SearchResultProps };