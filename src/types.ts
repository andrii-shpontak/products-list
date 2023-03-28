export interface IData {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface IState {
  productsData: IData[];
  searchBy: string;
  limit: number;
  isLoading: boolean;
  isError: boolean;
  errorText: string;
  byCategory: string;
  searchType: string;
}
