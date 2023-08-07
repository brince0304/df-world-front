import { Chip, ChipProps, useMediaQuery } from '@mui/material';
import { ForwardedRef, forwardRef } from 'react';

const MyChip = (props: MyChipProps, ref: ForwardedRef<HTMLDivElement>) => {
  const isMobile = useMediaQuery('(max-width: 480px)');

  return (
    <Chip
      ref={ref}
      sx={{
        fontSize: isMobile ? '0.8rem' : '0.9rem',
        fontWeight:'500',
      }}
      size={isMobile ? 'small' : 'medium'}
      {...props}
    />
  );
};

export default forwardRef(MyChip);

interface MyChipProps extends ChipProps {}
