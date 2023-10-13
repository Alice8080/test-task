import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Icon } from '@iconify/react';
import IconButton from '@mui/material/IconButton';
import { useDispatch } from "react-redux";
import { removeBooks } from "../../reducers/booksSlice";
import { Params } from "../../interfaces/interfaces";
import './search-form.scss';

// Formik и Yup используются для валидации данных, MUI и Iconify для стилистического оформления

const SearchForm = ({ handleSubmit, initial }: { handleSubmit: (params: any | Params) => void, initial: string | null }) => {
    const dispatch = useDispatch();
    return (
        <Formik
            initialValues={{
                query: initial,
                category: 'all',
                sorting: 'relevance'
            }}
            validationSchema={Yup.object({
                query: Yup.string().required('This is a required field')
            })}
            validateOnChange={false}
            validateOnBlur={false}
            onSubmit={({ query, category, sorting }) => {
                dispatch(removeBooks());
                const offset = 0;
                const params: Params = { query, category, sorting, offset };
                handleSubmit(params);
            }}>
            <Form className="search-form">
                <div className="search-form__field">
                    <div className="search-form__input">
                        <Field
                            id="query"
                            name="query"
                            type="search"
                            placeholder="Enter your request"
                            autoComplete="off" />
                        <IconButton aria-label="Искать" type="submit" title="Искать" className="search-form__button">
                            <Icon className="search-form__icon" icon="fluent:search-32-regular" />
                        </IconButton>
                        <ErrorMessage className='search-form__error' component="div" name="query" />
                    </div>
                    <div className="search-form__selects">
                        <Field
                            as="select"
                            id="category"
                            name="category">
                            <option value="all" selected>All</option>
                            <option value="art">Art</option>
                            <option value="biography">Biography</option>
                            <option value="computers">Computers</option>
                            <option value="history">History</option>
                            <option value="medical">Medical</option>
                            <option value="poetry">Poetry</option>
                        </Field>
                        <Field
                            as="select"
                            id="sorting"
                            name="sorting">
                            <option value="relevance" selected>Relevance</option>
                            <option value="newest">Newest</option>
                        </Field>
                    </div>
                </div>
            </Form>
        </Formik>
    )
}

export default SearchForm;