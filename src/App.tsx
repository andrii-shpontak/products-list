import { lazy, Suspense, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';

import { getProductsData } from './store/productsSlice';
import Spinner from './components/Spinner';

const NavBar = lazy(() => import('./components/NavBar'));
const MainPage = lazy(() => import('./pages/MainPage'));
const AddForm = lazy(() => import('./pages/AddForm'));

function App() {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isError, setError] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>('');

  const getData = async () => {
    setLoading(true);
    setError(false);

    try {
      const { data } = await axios.get(`https://dummyjson.com/products?limit=100`, {
        headers: {
          Accept: 'application/json',
        },
      });

      dispatch(getProductsData(data.products));
      setErrorText('');
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
      if (axios.isAxiosError(error)) {
        setErrorText(`error message: ${error.message}`);
      } else {
        console.log('unexpected error: ', error);
        setErrorText('An unexpected error occurred');
      }
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []); // Component did mount

  return (
    <>
      <NavBar />
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route
            path="/"
            element={<MainPage isLoading={isLoading} isError={isError} errorText={errorText} />}
          />
          <Route path="/addform" element={<AddForm />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
