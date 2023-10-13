import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';
import books from '../reducers/booksSlice';

// Конфигурация глобального состояния 

const stringMiddleware = () => (next: (arg0: { type: string; }) => any) => (action: { type: string; }) => {  
    if (typeof action === 'string') { 
        return next({ 
            type: action
        })
    }
    return next(action);
}

const store = configureStore({
    reducer: {books, [apiSlice.reducerPath]: apiSlice.reducer},
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware, apiSlice.middleware),
    devTools: process.env.NODE_ENV !== 'production',
}); 

export default store;
export type RootState = ReturnType<typeof store.getState>
