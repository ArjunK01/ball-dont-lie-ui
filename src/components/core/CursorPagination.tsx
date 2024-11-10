import { IconButton, Select, MenuItem, Stack, Typography } from "@mui/material";
import { NavigateBefore, NavigateNext } from "@mui/icons-material";

interface PaginationProps {
  currentPage: number;
  pageSize: number;
  setPageSize: (pageSize: number) => void;
  fetchNextPage: (() => void) | null;
  fetchPreviousPage: (() => void) | null;
  loading: boolean;
}

const CursorPagination = ({
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
      <Typography>Per page</Typography>
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
        <PaginationButton
          onClick={fetchPreviousPage ? fetchPreviousPage : undefined}
          disabled={!fetchPreviousPage}
          loading={loading}
        >
          <NavigateBefore />
        </PaginationButton>

        <Typography>{currentPage + 1}</Typography>

        <PaginationButton
          onClick={fetchNextPage ? fetchNextPage : undefined}
          disabled={!fetchNextPage}
          loading={loading}
        >
          <NavigateNext />
        </PaginationButton>
      </Stack>
    </Stack>
  );
};

const PaginationButton = ({
  onClick,
  disabled,
  loading,
  children,
}: {
  onClick?: () => void;
  disabled: boolean;
  loading: boolean;
  children: React.ReactNode;
}) => (
  <IconButton
    onClick={onClick}
    disabled={disabled}
    sx={{ opacity: loading || disabled ? 0.5 : 1 }}
  >
    {children}
  </IconButton>
);

export default CursorPagination;