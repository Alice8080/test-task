import { FC } from "react";
import { useNavigate } from 'react-router-dom';
import './search-result.scss';
import { Book, SearchResultProps } from "../../interfaces/interfaces";

const SearchResult: FC<SearchResultProps> = ({ result }: SearchResultProps) => {
    const navigate = useNavigate();
    
    if (result.length === 0) {
        return (
            <p className="search-result__notfound">
                Nothing found
            </p>
        )
    }
    const navigateTo = (id: string) => {
        navigate(`/${id}`);
    }
    return (
        <div className="search-result__items">
            {result.map(({ id, title, authors, categories, smallThumbnail }: Book) => {
                const thumbnail = (smallThumbnail || []).length !== 0 ? <img src={smallThumbnail} alt={title} /> : '';
                return (
                    <div key={id} className="search-result__item">
                        <button onClick={() => navigateTo(id)}>
                            <div className="search-result__text">
                                {thumbnail}
                                <h6>{title}</h6>
                                <ul>
                                    {authors.map((author) => <li key={author}>{author}</li>)}
                                </ul>
                                <br />
                                <p>{categories[0]}</p>
                            </div>
                        </button>
                    </div>
                )
            })}
        </div>
    )
}

export default SearchResult;