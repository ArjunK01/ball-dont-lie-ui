import { AgGridReact } from "ag-grid-react";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ColDef, RowClickedEvent } from "ag-grid-community";
import CursorPagination from "./CursorPagination";
import { useMemo } from "react";

interface TableWithPaginationProps<T> {
  cols: ColDef[];
  data: T[];
  isLoading: boolean;
  error?: Error;
  refetch?: () => void;
  currentPage: number;
  pageSize: number;
  setPageSize: (pageSize: number) => void;
  fetchNextPage: (() => void) | null;
  fetchPreviousPage: (() => void) | null;
  onRowClicked?: (event: RowClickedEvent<T>) => void;
  showPinnedTopRow?: boolean;
}

const TableWithPagination = <T extends {}>({
  cols,
  data,
  isLoading,
  error,
  refetch,
  currentPage,
  pageSize,
  setPageSize,
  fetchNextPage,
  fetchPreviousPage,
  onRowClicked,
  showPinnedTopRow = false,
}: TableWithPaginationProps<T>) => {
  const pinnedTopRowData = useMemo(
    () => (showPinnedTopRow ? [{}] : []),
    [showPinnedTopRow]
  );

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        minHeight: 300,
      }}
    >
      <Box
        className="ag-theme-alpine"
        sx={{
          flex: 1,
          "& .ag-row": {
            cursor: onRowClicked !== undefined ? "pointer" : "default",
          },
          position: "relative",
        }}
      >
        <AgGridReact
          columnDefs={cols}
          rowData={data}
          defaultColDef={{
            sortable: false,
            floatingFilter: false,
            resizable: true,
          }}
          onRowClicked={onRowClicked}
          pinnedTopRowData={pinnedTopRowData}
        />
        {(isLoading || error) && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: error
                ? "rgba(0, 0, 0, 0.7)"
                : "rgba(0, 0, 0, 0.1)",
              display: "grid",
              placeItems: "center",
            }}
          >
            {error ? (
              <Stack gap={2}>
                <Typography sx={{ color: "white" }}>
                  Error: {error?.message}
                </Typography>
                {refetch && (
                  <Button variant="contained" onClick={refetch}>
                    Retry
                  </Button>
                )}
              </Stack>
            ) : (
              <CircularProgress />
            )}
          </Box>
        )}
      </Box>

      <CursorPagination
        currentPage={currentPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        fetchNextPage={fetchNextPage}
        fetchPreviousPage={fetchPreviousPage}
        loading={isLoading}
      />
    </Box>
  );
};

export default TableWithPagination;
