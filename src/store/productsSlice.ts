import { createSlice } from '@reduxjs/toolkit';
import { IState } from '../types';

const initialState: IState = {
  productsData: [],
  searchBy: '',
  limit: 5,
  isLoading: false,
  isError: false,
  errorText: '',
  byCategory: '',
  searchType: 'title',
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    getProductsData: (state, action) => {
      state.productsData = action.payload;
    },
    updateSearchValue: (state, action) => {
      state.searchBy = action.payload;
    },
    updateLimit: (state, action) => {
      state.limit = action.payload;
    },
    removeProductById: (state, action) => {
      state.productsData = state.productsData.filter((item) => item.id !== action.payload);
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.isError = action.payload;
    },
    setErrorText: (state, action) => {
      state.errorText = action.payload;
    },
    setByCategory: (state, action) => {
      state.byCategory = action.payload;
    },
    setSearchType: (state, action) => {
      state.searchType = action.payload;
    },
  },
});

export const {
  getProductsData,
  updateSearchValue,
  updateLimit,
  setLoading,
  setError,
  removeProductById,
  setErrorText,
  setByCategory,
  setSearchType,
} = productsSlice.actions;
export default productsSlice.reducer;
