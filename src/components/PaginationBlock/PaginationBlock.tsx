import { Pagination } from '@mui/material';
import { Box } from '@mui/system';
import React, { FunctionComponent } from 'react';

interface PaginationBlockProps {
  defaultPage: number;
  page: number;
  onChange: (event: React.ChangeEvent<unknown>, page: number) => void;
  count: number;
  color?: 'primary' | 'secondary' | 'standard';
}

export const PaginationBlock: FunctionComponent<PaginationBlockProps> = ({
  defaultPage,
  page,
  onChange,
  count,
  color = 'primary'
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        m: '1rem'
      }}
    >
      <Pagination
        defaultPage={defaultPage}
        page={page}
        onChange={onChange}
        count={count}
        color={color}
      ></Pagination>
    </Box>
  );
};
