import { Container } from '@mui/material';
import AddForm from '../components/AddForm';
import ProductsList from '../components/ProductsList';
import SearchPanel from '../components/SearchPanel';

const MainPage = () => {
  return (
    <Container>
      <SearchPanel />
      <ProductsList />
      {/* <AddForm /> */}
    </Container>
  );
};

export default MainPage;
