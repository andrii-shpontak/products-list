import { Box, Typography } from '@mui/material';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import { IData, IState } from '../types';
import CardCreator from './CardCreator';
import { updateLimit } from '../store/productsSlice';

const ProductsList = () => {
  const dispatch = useDispatch();
  const data: IData[] = useSelector((state: IState) => state?.productsData);
  const searchType: string = useSelector((state: IState) => state?.searchType);

  const limit: number = useSelector((state: IState) => state?.limit);
  const searchValue: string = useSelector((state: IState) => state?.searchBy);

  const loadMore = () => {
    if (limit > 0 || limit + 10 < 100) {
      dispatch(updateLimit(limit + 10));
    }
  };

  const filteredProducts = useMemo(() => {
    return data?.filter((data) => {
      return searchType === 'title'
        ? data.title.toLowerCase().includes(searchValue.toLowerCase())
        : data.category.toLowerCase().includes(searchValue.toLowerCase());
    });
  }, [searchValue, data, searchType]);
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: '1fr 1fr 1fr' },
        columnGap: 2,
        marginBottom: '50px',
      }}>
      {data.length > 0 ? (
        filteredProducts.map((item) => {
          return <CardCreator key={item.id} {...item} />;
        })
      ) : (
        <h2 style={{ textAlign: 'center' }}>no data...</h2>
      )}
      <Box>
        {limit > 0 && limit < 100 ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
              margin: '45px auto 0 auto',
              width: '300px',
              height: '150px',
              borderRadius: '5px',
              cursor: 'pointer',
              ':hover': { backgroundColor: '#c3c3c3' },
            }}
            onClick={loadMore}>
            <Typography variant="h4">Load more</Typography>
            <ReadMoreIcon fontSize="large" />
          </Box>
        ) : null}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            margin: '45px auto 0 auto',
            width: '300px',
            height: '150px',
            borderRadius: '5px',
            cursor: 'pointer',
            ':hover': { backgroundColor: '#c3c3c3' },
          }}
          onClick={() => console.log('add new prod')}>
          <Typography variant="h4">Add new product</Typography>
          <AddCircleOutlineIcon fontSize="large" />
        </Box>
      </Box>
    </Box>
  );
};

export default ProductsList;
