import { createSlice } from '@reduxjs/toolkit';
import { IState } from '../types';

const initialState: IState = {
  productsData: [],
  changedData: [],
  searchBy: '',
  isLoading: false,
  isError: false,
  errorText: '',
  searchType: 'title',
  mySort: 'none',
  myFilter: 'none',
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    getProductsData: (state, action) => {
      state.productsData = action.payload;
    },
    setChangedData: (state, action) => {
      state.changedData = action.payload;
    },
    updateSearchValue: (state, action) => {
      state.searchBy = action.payload;
    },
    removeProductById: (state, action) => {
      state.productsData = state.productsData.filter((item) => item.id !== action.payload);
    },
    addNewProduct: (state, action) => {
      state.productsData.unshift(action.payload);
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
    setSearchType: (state, action) => {
      state.searchType = action.payload;
    },
    setMySort: (state, action) => {
      state.mySort = action.payload;
    },
    setMyFilter: (state, action) => {
      state.myFilter = action.payload;
    },
  },
});

export const {
  getProductsData,
  setChangedData,
  updateSearchValue,
  setLoading,
  setError,
  removeProductById,
  addNewProduct,
  setErrorText,
  setSearchType,
  setMySort,
  setMyFilter,
} = productsSlice.actions;
export default productsSlice.reducer;
