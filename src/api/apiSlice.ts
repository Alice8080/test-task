import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Book, Response, ResponseItem } from '../interfaces/interfaces';

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = 'https://www.googleapis.com/books/v1/volumes';
const MAX_RESULTS = 30;

/**
 * Конфигурация асинхронных запросов к API  
 */

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }), 
    tagTypes: ['Books'],
    endpoints: builder => ({
        getSearchResults: builder.query({
            query: ({ query, category, sorting, offset }) => ({
                url: `?q=${query}${category === 'all' ? '' : `+subject:${category}`}&maxResults=${MAX_RESULTS}&startIndex=${offset}&orderBy=${sorting}&key=${API_KEY}`,
            }),
            transformResponse: (response: Response) => ({
                totalItems: response.totalItems,
                items: response.totalItems === 0 || !response.items ? [] : response.items.map((item): Book => {
                    return {
                        id: item.id,
                        title: item.volumeInfo.title ?? '',
                        authors: item.volumeInfo.authors ?? [],
                        categories: item.volumeInfo.categories ?? [''],
                        thumbnail: item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail ? item.volumeInfo.imageLinks.thumbnail : '',
                        smallThumbnail: item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail ? item.volumeInfo.imageLinks.thumbnail : '',
                        description: item.volumeInfo.description ? item.volumeInfo.description.replace(/(<\/?p>)|(<\/?b>)|(<\/?i>)|(<br>)/g, ' ') : ''
                    }
                })
            }),
            transformErrorResponse: (response, meta, arg) => response,
            providesTags: ['Books']
        }),
        getBookInfo: builder.query({
            query: ({ bookId }) => ({
                url: `/${bookId}`,
            }),
            transformResponse: (item: ResponseItem): Book => ({
                id: item.id,
                title: item.volumeInfo.title ?? '',
                authors: item.volumeInfo.authors ?? [],
                categories: item.volumeInfo.categories ?? [],
                thumbnail: item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail ? item.volumeInfo.imageLinks.thumbnail : '',
                smallThumbnail: item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail ? item.volumeInfo.imageLinks.thumbnail : '',
                description: item.volumeInfo.description ? item.volumeInfo.description.replace(/(<\/?p>)|(<\/?b>)|(<\/?i>)|(<br>)/g, ' ') : ''
            }),
            transformErrorResponse: (response, meta, arg) => response,
        }),
    })
});

export const {
    useLazyGetSearchResultsQuery,
    useLazyGetBookInfoQuery
} = apiSlice;