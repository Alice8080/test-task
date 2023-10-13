import { useState, useEffect, useMemo } from 'react';
import { Icon } from '@iconify/react';
import { useSelector, useDispatch } from "react-redux";
import { useLazyGetSearchResultsQuery } from '../../api/apiSlice';
import { useSearchParams } from "react-router-dom";
import SearchForm from '../../components/searchForm/SearchForm';
import SearchResult from '../../components/searchResult/SearchResult';
import Error from '../../components/error/Error';
import SmallLoader from '../../components/loader/SmallLoader';
import { Params } from '../../interfaces/interfaces';
import { addBooks } from '../../reducers/booksSlice';
import { RootState } from '../../store/index';

const HomePage = () => {
    const dispatch = useDispatch();
    const { books } = useSelector((state: RootState) => state.books);
    let [searchParams, setSearchParams] = useSearchParams();
    const [getSearchResults,
        { data: result,
            isLoading,
            isFetching,
            isSuccess,
            isError
        }] = useLazyGetSearchResultsQuery();

    const [listEnded, setListEnded] = useState(false);
    const handleSubmit = (params: any | Params) => {
        getSearchResults(params);
        setSearchParams(params);
    }

    useEffect(() => {
        if (searchParams.size > 0) {
            getSearchResults({
                query: searchParams.get('query'),
                category: searchParams.get('category'),
                sorting: searchParams.get('sorting'),
                offset: 0,
            });
        } 
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (result && result.items !== undefined) {
            result.items.length < 30 ? setListEnded(true) : setListEnded(false);
            dispatch(addBooks(result.items));
        }
        // eslint-disable-next-line
    }, [result]);

    const renderContent = useMemo(() => {
        if (result) {
            return (
                <>
                    <div className="search__result search-result">
                        <hr className="search__line" />
                        <h6 id="search__result-title">Searching results:</h6>
                        <SearchResult result={books} />
                    </div>
                </>)
        }
        // eslint-disable-next-line
    }, [books]);

    return (
        <>
            <SearchForm handleSubmit={handleSubmit} initial={searchParams.has('query') ? searchParams.get('query') : ''} />
            {isSuccess ?
                <>
                    {renderContent}
                    {(result && result.totalItems !== 0) && !listEnded ? (
                        <button
                            className="search-result__button-add"
                            disabled={isLoading || isFetching}
                            onClick={() => {
                                const offset = books.length;
                                const params: Params = {
                                    query: searchParams.get('query'),
                                    category: searchParams.get('category'),
                                    sorting: searchParams.get('sorting'),
                                    offset
                                };
                                handleSubmit(params);
                            }}>
                            Load more
                            <Icon icon="system-uicons:refresh-alt" />
                        </button>
                    ) : null}
                </> :
                isError ? <Error /> 
                : null}
            {isLoading || isFetching ? <SmallLoader /> : null}
        </>
    )
}
export default HomePage;