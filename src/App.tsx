import axios from 'axios';
import { Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import NavBar from './components/NavBar';
import MainPage from './pages/MainPage';
import Spinner from './components/Spinner';
import { setLoading, setError, getProductsData, setErrorText } from './store/productsSlice';
import { IState } from './types';

function App() {
  const dispatch = useDispatch();
  const limit: number = useSelector((state: IState) => state?.limit);
  const byCategory: string = useSelector((state: IState) => state?.byCategory);

  const getData = async () => {
    dispatch(setLoading(true));
    dispatch(setError(false));

    try {
      const { data } = await axios.get(
        byCategory !== ''
          ? `https://dummyjson.com/products/category/${byCategory}`
          : `https://dummyjson.com/products?limit=${limit}`,
        {
          headers: {
            Accept: 'application/json',
          },
        },
      );

      dispatch(getProductsData(data.products));
      dispatch(setErrorText(''));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setError(true));
      dispatch(setLoading(false));
      if (axios.isAxiosError(error)) {
        dispatch(setErrorText(`error message: ${error.message}`));
      } else {
        console.log('unexpected error: ', error);
        dispatch(setErrorText('An unexpected error occurred'));
      }
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, [limit]); // Component did mount

  return (
    <Suspense fallback={<Spinner />}>
      <NavBar />
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
