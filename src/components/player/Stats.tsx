import {
  Stack,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import TableWithPagination from "../core/TableWithPagination";
import { statColDefs } from "../../constants/columns";
import useStats from "../../hooks/useStats";

const Stats = ({ id }: { id: number }) => {
  const {
    stats,
    error,
    isLoading,
    selectedSeason,
    setSelectedSeason,
    currentPage,
    pageSize,
    setPageSize,
    fetchNextPage,
    fetchPreviousPage,
    refetch,
  } = useStats(id);

  const seasons = Array.from({ length: 15 }, (_, i) => 2024 - i);

  return (
    <Stack gap={2} sx={{ flex: 1, marginTop: 2 }}>
      <Typography variant="h6">Stats</Typography>

      <FormControl sx={{ width: 120 }}>
        <InputLabel id="season-select-label">Season</InputLabel>
        <Select
          labelId="season-select-label"
          id="season-select"
          value={selectedSeason}
          label="Season"
          onChange={(e) => setSelectedSeason(Number(e.target.value))}
        >
          {seasons.map((season) => (
            <MenuItem key={season} value={season}>
              {season}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TableWithPagination
        data={stats}
        cols={statColDefs}
        isLoading={isLoading}
        error={error}
        refetch={refetch}
        currentPage={currentPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        fetchNextPage={fetchNextPage}
        fetchPreviousPage={fetchPreviousPage}
      />
    </Stack>
  );
};

export default Stats;
