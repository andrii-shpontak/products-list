import { InputAdornment, Stack, Input, Select, MenuItem, Box, FormControl } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SelectChangeEvent } from '@mui/material/Select';
import { setSearchType, updateSearchValue } from '../store/productsSlice';
import { IState } from '../types';

const SearchPanel = () => {
  const searchType: string = useSelector((state: IState) => state?.searchType);

  const [searchValue, setSearchValue] = useState<string>('');
  const dispatch = useDispatch();

  const onSetSearchType = (event: SelectChangeEvent) => {
    dispatch(setSearchType(event.target.value as string));
  };

  useEffect(() => {
    dispatch(updateSearchValue(searchValue));
  }, [dispatch, searchValue]);

  return (
    <Box
      sx={{
        margin: '15px 0',
        padding: '15px 0',
        display: 'flex',
        justifyContent: 'center',
      }}>
      <Stack
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Input
          sx={{
            width: '300px',
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
    </Box>
  );
};

export default SearchPanel;
