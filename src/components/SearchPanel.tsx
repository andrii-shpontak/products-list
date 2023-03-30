import { useState, useEffect } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { SelectChangeEvent } from '@mui/material/Select';

import {
  setMyFilter,
  setMySort,
  setSearchType,
  updateMyFilterText,
  updateSearchValue,
} from '../store/productsSlice';
import { IState, TMySort } from '../types';

const SearchPanel: React.FC = () => {
  const searchType: 'title' | 'category' = useSelector((state: IState) => state?.searchType);
  const mySort: TMySort = useSelector((state: IState) => state?.mySort);
  const myFilter: TMySort = useSelector((state: IState) => state?.myFilter);

  const [searchValue, setSearchValue] = useState<string>('');
  const [filterValue, setFilterValue] = useState<string>('');
  const dispatch = useDispatch();

  const onSetSearchType = (event: SelectChangeEvent) => {
    dispatch(setSearchType(event.target.value as string));
  };

  useEffect(() => {
    dispatch(updateSearchValue(searchValue));
  }, [dispatch, searchValue]);

  useEffect(() => {
    if (myFilter === 'none') {
      setFilterValue('');
    }
  }, [myFilter, setFilterValue, filterValue]);

  useEffect(() => {
    dispatch(updateMyFilterText(filterValue));
  }, [filterValue, dispatch]);

  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}>
      {/* Search input */}
      <Typography margin={2} textAlign={'center'} variant="h4">
        Search, sort and filter fields
      </Typography>
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
          onChange={(e) => {
            setSearchValue(e.target.value);
            dispatch(setMySort('none'));
            dispatch(setMyFilter('none'));
          }}
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
      {/* End search input */}

      {/* Sort and filter */}
      <Stack
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'top',
          margin: '15px auto 0 auto',
        }}>
        {/* Sort */}

        <FormControl style={{ textAlign: 'center', margin: '10px' }}>
          <Typography variant="h6">Sotr by</Typography>
          <Select
            name="sort"
            value={mySort}
            onChange={(e) => {
              dispatch(setMySort(e.target.value));
              setSearchValue('');
              dispatch(setMyFilter('none'));
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
          <Typography variant="body1">(Ascending)</Typography>
        </FormControl>

        {/* Filter */}

        <FormControl style={{ textAlign: 'center', margin: '10px' }}>
          <Typography variant="h6">Filter type</Typography>
          <Select
            name="filter"
            value={myFilter}
            onChange={(e) => {
              dispatch(setMyFilter(e.target.value));
              dispatch(setMySort('none'));
              setSearchValue('');
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

        {/* Filter text input */}

        <FormControl style={{ margin: '10px' }}>
          <Typography variant="h6">Filter text</Typography>
          <Input
            sx={{
              maxWidth: '300px',
              height: '56px',
              fontSize: '18px',
              border: '1px solid rgba(0,0,0, 0.5)',
              borderRadius: '5px',
              paddingLeft: '15px',
            }}
            disabled={myFilter === 'none' ? true : false}
            name="filter"
            placeholder="Filter..."
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
          />
        </FormControl>
      </Stack>
    </Paper>
  );
};

export default SearchPanel;
