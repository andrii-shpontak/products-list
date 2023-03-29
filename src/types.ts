export interface IData {
  id: number;
  title: string;
  author?: string;
  yearOfPublication?: string;
  description?: string;
  price?: number;
  discountPercentage?: number;
  rating: number;
  stock?: number;
  brand?: string;
  category: string;
  thumbnail?: string;
  images: string[];
}

export interface IState {
  productsData: IData[];
  changedData: IData[];
  searchBy: string;
  isLoading: boolean;
  isError: boolean;
  errorText: string;
  searchType: string;
  mySort: string;
  myFilter: string;
}
