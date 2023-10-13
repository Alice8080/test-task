import { FC, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Header from "./components/header/Header";
import Loader from "./components/loader/Loader";
const HomePage = lazy(() => import('./pages/homePage/HomePage'));
const BookPage = lazy(() => import('./pages/bookPage/BookPage'));

const helmetContext = {};

const App: FC = () => {
  return (
    <HelmetProvider context={helmetContext}>
      <Router>
        <div className="wrapper">
          <Header />
          <main className="main">
            <div className="content">
              <Suspense fallback={<Loader />}>
                <Routes>
                  <Route path='/' element={<HomePage />} />
                  <Route path='/:bookId' element={<BookPage />} />
                </Routes>
              </Suspense>
            </div>
          </main>
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
