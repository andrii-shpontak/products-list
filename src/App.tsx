import axios from 'axios';
import { Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import NavBar from './components/NavBar';
import MainPage from './pages/MainPage';
import Spinner from './components/Spinner';
import { setLoading, setError, getProductsData, setErrorText } from './store/productsSlice';
import AddForm from './pages/AddForm';

function App() {
  const dispatch = useDispatch();

  const getData = async () => {
    dispatch(setLoading(true));
    dispatch(setError(false));

    try {
      const { data } = await axios.get(`https://dummyjson.com/products?limit=100`, {
        headers: {
          Accept: 'application/json',
        },
      });

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
  }, []); // Component did mount

  return (
    <Suspense fallback={<Spinner />}>
      <NavBar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/addform" element={<AddForm />} />
      </Routes>
    </Suspense>
  );
}

export default App;
