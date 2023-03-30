import { useEffect, useMemo, useState } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { IData, IState, TMySort } from '../types';
import CardCreator from './CardCreator';
import CustomPagination from './CustomPagination';
import { setChangedData, updateSearchValue } from '../store/productsSlice';

const ProductsList = () => {
  const dispatch = useDispatch();

  const data: IData[] = useSelector((state: IState) => state?.productsData);
  const searchType: 'title' | 'category' = useSelector((state: IState) => state?.searchType);
  const searchValue: string = useSelector((state: IState) => state?.searchBy);
  const sortedData: IData[] = useSelector((state: IState) => state?.changedData);
  const mySort: TMySort = useSelector((state: IState) => state?.mySort);
  const myFilter: TMySort = useSelector((state: IState) => state?.myFilter);
  const myFilterText: string = useSelector((state: IState) => state?.myFilterText);

  const [currentPage, setCurrentPage] = useState(1);

  const offset = 5;

  const lastProductIndex = currentPage * offset;
  const firstProductIndex = lastProductIndex - offset;

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

  const findedProducts = useMemo(() => {
    setCurrentPage(1);
    return data?.filter((data) => {
      return data[searchType].toLowerCase().includes(searchValue.toLowerCase());
    });
  }, [searchValue, data, searchType]);

  useEffect(() => {
    if (myFilter === 'none' || myFilterText === '') {
      dispatch(setChangedData({}));
      return;
    } else if (typeof data !== 'undefined') {
      setCurrentPage(1);
      dispatch(
        setChangedData(
          data?.filter((data) =>
            data[myFilter]!.toString()
              .toLowerCase()
              .includes(myFilterText.toString().toLowerCase()),
          ),
        ),
      );
    }
  }, [myFilterText, myFilter, data]);

  const renderData: IData[] = useMemo(() => {
    if (searchValue === '' && mySort === 'none' && myFilterText === '') {
      return data;
    } else if (searchValue !== '' && mySort === 'none' && myFilterText === '') {
      return findedProducts;
    } else if (mySort !== 'none' || myFilterText !== '') {
      return sortedData;
    }
    return data;
  }, [searchValue, mySort, data, findedProducts, sortedData, myFilter, myFilterText]);

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
      {renderData.length === 0 ? (
        <Typography variant="h4" sx={{ margin: '25px auto', textAlign: 'center' }}>
          {data.length === 0 ? 'No data...' : 'No matches...'}
        </Typography>
      ) : null}
    </Stack>
  );
};

export default ProductsList;
