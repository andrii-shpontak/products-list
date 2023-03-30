import { Box, Button } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { IData, IState, TMySort } from '../types';
import CardCreator from './CardCreator';
import { Stack } from '@mui/system';
import { Link } from 'react-router-dom';
import CustomPagination from './CustomPagination';
import { setChangedData, updateSearchValue } from '../store/productsSlice';

const ProductsList = () => {
  const dispatch = useDispatch();
  const data: IData[] = useSelector((state: IState) => state?.productsData);
  const searchType: string = useSelector((state: IState) => state?.searchType);
  const searchValue: string = useSelector((state: IState) => state?.searchBy);
  const sortedData: IData[] = useSelector((state: IState) => state?.changedData);

  const mySort: TMySort = useSelector((state: IState) => state?.mySort);

  const [currentPage, setCurrentPage] = useState(1);
  const offset = 5;

  const lastProductIndex = currentPage * offset;
  const firstProductIndex = lastProductIndex - offset;
  // const currentProducts = data.slice(firstProductIndex, lastProductIndex);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  useEffect(() => {
    if (mySort === 'none' || typeof data === 'undefined') {
      dispatch(setChangedData({}));
      return;
    } else if (typeof data !== 'undefined') {
      dispatch(setChangedData([...data].sort((a, b) => (a[mySort]! < b[mySort]! ? -1 : 1))));
      dispatch(updateSearchValue(''));
    }
  }, [mySort, dispatch, data]);

  const filteredProducts = useMemo(() => {
    return data?.filter((data) => {
      return searchType === 'title'
        ? data.title.toLowerCase().includes(searchValue.toLowerCase())
        : data.category.toLowerCase().includes(searchValue.toLowerCase());
    });
  }, [searchValue, data, searchType]);

  const renderData: IData[] = useMemo(() => {
    if (searchValue === '' && mySort === 'none') {
      return data;
    } else if (searchValue !== '' && mySort === 'none') {
      return filteredProducts;
    } else if (mySort !== 'none') {
      return sortedData;
    }
    return data;
  }, [searchValue, mySort, data, filteredProducts, sortedData]);

  return (
    <Stack>
      <Link style={{ textDecoration: 'none', margin: '0 auto' }} to="/addform">
        <Button sx={{ height: '50px' }} startIcon={<AddCircleIcon />}>
          Add new product
        </Button>
      </Link>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: '1fr 1fr 1fr' },
          columnGap: 2,
          marginBottom: '50px',
        }}>
        {Array.isArray(renderData)
          ? renderData.slice(firstProductIndex, lastProductIndex).map((item) => {
              return <CardCreator key={item.id} {...item} />;
            })
          : null}
        <Box></Box>
      </Box>
      {renderData.length > offset ? (
        <CustomPagination offset={offset} totalProducts={renderData.length} paginate={paginate} />
      ) : null}
    </Stack>
  );
};

export default ProductsList;
