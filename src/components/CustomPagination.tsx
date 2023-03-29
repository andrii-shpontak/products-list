import React from 'react';
import { Pagination, Stack } from '@mui/material';

interface IPagination {
  offset: number;
  totalProducts: number;
  paginate: any;
}

const CustomPagination: React.FC<IPagination> = ({ offset, totalProducts, paginate }) => {
  let jobsNumbers = 0;

  for (let i = 1; i <= Math.ceil(totalProducts / offset); i++) {
    jobsNumbers = i;
  }
  return (
    <Stack sx={{ margin: '0 auto 25px auto' }}>
      {
        <Pagination
          className="paginate"
          count={jobsNumbers}
          onChange={(_, num) => paginate(num)}
          variant="outlined"
          shape="rounded"
        />
      }
    </Stack>
  );
};

export default CustomPagination;
