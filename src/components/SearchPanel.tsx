import {
  InputAdornment,
  Stack,
  Input,
  Select,
  MenuItem,
  FormControl,
  Paper,
  Typography,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SelectChangeEvent } from '@mui/material/Select';
import { setMySort, setSearchType, updateSearchValue } from '../store/productsSlice';
import { IState } from '../types';

const SearchPanel: React.FC = () => {
  const searchType: string = useSelector((state: IState) => state?.searchType);
  const mySort: string = useSelector((state: IState) => state?.mySort);

  const [searchValue, setSearchValue] = useState<string>('');
  const dispatch = useDispatch();

  const onSetSearchType = (event: SelectChangeEvent) => {
    dispatch(setSearchType(event.target.value as string));
  };

  useEffect(() => {
    dispatch(updateSearchValue(searchValue));
  }, [dispatch, searchValue]);

  return (
    <Paper
      sx={{
        margin: '15px 0',
        padding: '15px 0',
        display: 'flex',
        flexDirection: 'column',
      }}>
      <Stack
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          margin: '0 auto',
        }}>
        <Input
          sx={{
            maxWidth: '300px',
            height: '56px',
            fontSize: '18px',
            border: '1px solid rgba(0,0,0, 0.5)',
            borderRadius: '5px',
          }}
          name="search"
          placeholder="Search..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          startAdornment={
            <InputAdornment position="start">
              <Search sx={{ cursor: 'pointer', marginLeft: '10px' }} />
            </InputAdornment>
          }
        />
        <FormControl>
          <Select name="searchCategory" value={searchType} onChange={onSetSearchType}>
            <MenuItem value={'title'}>By name</MenuItem>
            <MenuItem value={'category'}>By category</MenuItem>
          </Select>
        </FormControl>
      </Stack>
      <Stack
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          margin: '15px auto 0 auto',
        }}>
        <FormControl style={{ textAlign: 'center', margin: '10px' }}>
          <Typography variant="h6">Sotr by</Typography>
          <Select
            name="sort"
            value={mySort}
            onChange={(e) => {
              dispatch(setMySort(e.target.value));
              // setMyFilter('none');
            }}>
            <MenuItem value={'none'}>Select</MenuItem>
            <MenuItem value={'id'}>By ID</MenuItem>
            <MenuItem value={'title'}>By name</MenuItem>
            <MenuItem value={'description'}>By description</MenuItem>
            <MenuItem value={'price'}>By price</MenuItem>
            <MenuItem value={'rating'}>By rating</MenuItem>
            <MenuItem value={'stock'}>By stock</MenuItem>
            <MenuItem value={'category'}>By category</MenuItem>
          </Select>
        </FormControl>
        {/* <FormControl style={{ textAlign: 'center', margin: '10px' }}>
          <Typography variant="h6">Filter by</Typography>
          <Select
            name="filter"
            value={myFilter}
            onChange={(e) => {
              setMyFilter(e.target.value);
              setMySort('none');
            }}>
            <MenuItem value={'none'}>Select</MenuItem>
            <MenuItem value={'id'}>By ID</MenuItem>
            <MenuItem value={'title'}>By name</MenuItem>
            <MenuItem value={'description'}>By description</MenuItem>
            <MenuItem value={'price'}>By price</MenuItem>
            <MenuItem value={'rating'}>By rating</MenuItem>
            <MenuItem value={'stock'}>By stock</MenuItem>
            <MenuItem value={'category'}>By category</MenuItem>
          </Select>
        </FormControl> */}
      </Stack>
    </Paper>
  );
};

export default SearchPanel;
