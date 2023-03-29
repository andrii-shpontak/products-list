import { Container } from '@mui/material';
import ProductsList from '../components/ProductsList';
import SearchPanel from '../components/SearchPanel';

const MainPage = () => {
  return (
    <Container>
      <SearchPanel />
      <ProductsList />
    </Container>
  );
};

export default MainPage;
