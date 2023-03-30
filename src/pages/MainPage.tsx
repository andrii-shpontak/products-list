import React from 'react';
import { Container } from '@mui/material';

import ProductsList from '../components/ProductsList';
import SearchPanel from '../components/SearchPanel';
import { IPagesProps } from '../types';
import Spinner from '../components/Spinner';

const MainPage: React.FC<IPagesProps> = ({ isError, isLoading, errorText }) => {
  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return (
      <div style={{ margin: '25px auto', textAlign: 'center' }} className="errorMessage">
        {errorText}
      </div>
    );
  }
  return (
    <Container>
      <SearchPanel />
      <ProductsList />
    </Container>
  );
};

export default MainPage;
