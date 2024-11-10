import {
  Box,
  IconButton,
  Pagination,
  Select,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { NavigateBefore, NavigateNext } from "@mui/icons-material";

interface PaginationProps {
  currentPage: number;
  pageSize: number;
  setPageSize: (pageSize: number) => void;
  fetchNextPage: (() => void) | null;
  fetchPreviousPage: (() => void) | null;
  loading: boolean;
}

const PlayersPagination = ({
  currentPage,
  pageSize,
  setPageSize,
  fetchNextPage,
  fetchPreviousPage,
  loading,
}: PaginationProps) => {
  const handlePageSizeChange = (event: any) => {
    setPageSize(event.target.value);
  };

  return (
    <Stack
      direction="row"
      justifyContent="flex-end"
      alignItems="center"
      sx={{
        p: 2,
        gap: 2,
      }}
    >
      <Typography>Players per page</Typography>
      <Select
        value={pageSize}
        onChange={handlePageSizeChange}
        size="small"
        disabled={loading}
      >
        <MenuItem value={25}>25</MenuItem>
        <MenuItem value={50}>50</MenuItem>
        <MenuItem value={75}>75</MenuItem>
        <MenuItem value={100}>100</MenuItem>
      </Select>
      <Stack direction="row" alignItems="center">
        {fetchPreviousPage && (
          <IconButton
            {...(!loading && { onClick: fetchPreviousPage })}
            sx={{
              opacity: loading ? 0.5 : 1,
            }}
          >
            <NavigateBefore />
          </IconButton>
        )}
        <Typography>{currentPage + 1}</Typography>
        {fetchNextPage && (
          <IconButton
            {...(!loading && { onClick: fetchNextPage })}
            sx={{
              opacity: loading ? 0.5 : 1,
            }}
          >
            <NavigateNext />
          </IconButton>
        )}
      </Stack>
    </Stack>
  );
};

export default PlayersPagination;
