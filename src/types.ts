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
export type TMySort =
  | 'none'
  | 'id'
  | 'title'
  | 'description'
  | 'price'
  | 'rating'
  | 'stock'
  | 'category'
  | 'images';

export interface IState {
  productsData: IData[];
  changedData: IData[];
  searchBy: string;
  isLoading: boolean;
  isError: boolean;
  errorText: string;
  searchType: string;
  mySort: TMySort;
  myFilter: string;
}
