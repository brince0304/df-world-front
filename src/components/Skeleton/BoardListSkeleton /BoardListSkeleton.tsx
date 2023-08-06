import { ListItemButton, Skeleton } from '@mui/material';
import Box from '@mui/material/Box';

const BoardItemSkeleton = () => {
  return (
    <ListItemButton
      sx={{
        border: '0.2px solid #e0e0e0',
        gap: '5px',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
      }}
    >
      <Box sx={{ gap: '10px', display: 'flex', flexDirection: 'row' }}>
        <Skeleton variant="rounded" width={50} height={18} />
        <Skeleton variant="rounded" width={40} height={18} />
        <Skeleton variant="rounded" width={40} height={18} />
      </Box>
      <Box sx={{ display: 'flex' }}>
        <Skeleton variant="rounded" width={500} height={30} />
      </Box>
      <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <Skeleton variant="circular" width={25} height={25} />
        <Skeleton variant="rounded" width={100} height={20} />
      </Box>
      <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <Skeleton variant="circular" width={15} height={15} />
        <Skeleton variant="rounded" width={20} height={13} />
        <Skeleton variant="circular" width={15} height={15} />
        <Skeleton variant="rounded" width={20} height={13} />
        <Skeleton variant="circular" width={15} height={15} />
        <Skeleton variant="rounded" width={20} height={13} />
      </Box>
    </ListItemButton>
  );
};

const BoardListSkeleton = () => {
  return (
    <Box>
      <BoardItemSkeleton />
      <BoardItemSkeleton />
    </Box>
  );
};

export default BoardListSkeleton;
