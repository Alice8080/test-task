import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { Book } from '../interfaces/interfaces';
import { RootState } from '../store/index';

const booksAdapter = createEntityAdapter<Book[]>();

const initialState = booksAdapter.getInitialState({
    books: []
});

const searchSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        addBooks (state: any, action) {
            const newBooks = action.payload.filter((item: Book) => !state.books.map((i: Book) => i.id).includes(item.id));
            const books = [...state.books, ...newBooks]
            state.books = books;
        },
        removeBooks (state) {
            state.books = [];
        }
    }
});

const { actions, reducer } = searchSlice;

export default reducer;

export const { selectAll } = booksAdapter.getSelectors((state: RootState) => state.books);

export const {
    addBooks,
    removeBooks
} = actions;