import { useDispatch, useSelector } from 'react-redux';
import { setChangedData } from '../store/productsSlice';

const dispatch = useDispatch();
const mySort = useSelector((state) => state.mySort);
const data = useSelector((state) => state.productsData);

if (mySort === 'none') {
  console.log('none');
  return;
} else {
  dispatch(
    setChangedData(
      [...data].sort((a, b) => {
        if (a[mySort] < b[mySort]) {
          return -1;
        }
        if (a[mySort] > b[mySort]) {
          return 1;
        }
        return 0;
      }),
    ),
  );
}
