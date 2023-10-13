import { useEffect, FC, useState } from 'react';
import { useLazyGetBookInfoQuery } from '../../api/apiSlice';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import Error from '../../components/error/Error';
import SmallLoader from '../../components/loader/SmallLoader';
import { RootState } from '../../store/index';
import { Book } from '../../interfaces/interfaces';
import './book.scss';

const BookPage: FC = () => {
    const { books } = useSelector((state: RootState) => state.books);
    const navigate = useNavigate();
    const [getBookInfo,
        { data,
            isLoading,
            isFetching,
            isSuccess,
            isError
        }] = useLazyGetBookInfoQuery();
    let { bookId } = useParams();
    const [book, setBook] = useState<Book>();

    // Если страница загружается после перехода из основного списка, данные о книге берутся из store
    // Если страница загружается после перехода по ссылке из внешнего источника или перезагрузки страницы, 
    // отправляется запрос по ID в параметрах URL
    useEffect(() => {
        if (bookId != 'undefined' && books.length === 0) {
            getBookInfo({ bookId });
        } else {
            setBook(books.find((item: Book) => item.id === bookId));
        }
        // eslint-disable-next-line
    }, [bookId]);

    useEffect(() => {
        if (data) {
            setBook(data);
        }
        // eslint-disable-next-line
    }, [data]);

    console.log(book)
    return (
        <div>
            <button className='back-link' onClick={() => navigate(-1)}>Go back</button>
            <br />
            {isLoading || isFetching ? <SmallLoader /> :
                isError ? <Error /> :
                    book ? (
                        <div className='book'>
                            <div className="book__img">
                                {!book.thumbnail || book.thumbnail.length === 0 ? 'No image' : <img src={book.thumbnail} alt={book.title} />}
                            </div>
                            <section className="book__text">
                                <h1>{book.title}</h1>
                                <ul>
                                    {book.authors.map((author) => <li key={author}>{author}</li>)}
                                </ul>
                                <br />
                                <ul>
                                    {book.categories.map((category) => <li key={category}>{category}</li>)}
                                </ul>
                                <br />
                                {book.description ? <p className='book__description'>{book.description}</p> : null}
                            </section>
                        </div>
                    ) : null}
        </div>
    )
}
export default BookPage;