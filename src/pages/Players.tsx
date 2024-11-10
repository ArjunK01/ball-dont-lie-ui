import { useMemo } from "react";
import { Player } from "../types/player-type";
import { Stack } from "@mui/material";
import Filtering from "../components/players/Filtering";
import usePlayers from "../hooks/usePlayers";
import useTeams from "../hooks/useTeams";
import TableWithPagination from "../components/core/TableWithPagination";
import { getColDefs } from "../constants/columns";
import { useNavigate } from "react-router-dom";
import { RowClickedEvent } from "ag-grid-community";
const Players = () => {
  const {
    players,
    isLoading,
    fetchNextPage,
    fetchPreviousPage,
    search,
    setSearch,
    currentPage,
    pageSize,
    setPageSize,
    refetch,
    error,
    firstNameFilter,
    setFirstNameFilter,
    lastNameFilter,
    setLastNameFilter,
    teamIdsFilter,
    setTeamIdsFilter,
    playerIdsFilter,
    setPlayerIdsFilter,
  } = usePlayers();

  const { teams, isLoading: teamsIsLoading, error: teamsError } = useTeams();
  const navigate = useNavigate();

  const onRowClicked = (event: RowClickedEvent<Player>) => {
    if (event.data?.id && !event.node.rowPinned) {
      navigate(`/players/${event.data.id}`);
    }
  };

  const cols = useMemo(() => {
    return getColDefs(
      firstNameFilter,
      setFirstNameFilter,
      lastNameFilter,
      setLastNameFilter
    );
  }, [firstNameFilter, setFirstNameFilter, lastNameFilter, setLastNameFilter]);

  return (
    <Stack sx={{ flex: 1 }} gap={1}>
      <Filtering
        search={search}
        setSearch={setSearch}
        teamIdsFilter={teamIdsFilter}
        setTeamIdsFilter={setTeamIdsFilter}
        playerIdsFilter={playerIdsFilter}
        setPlayerIdsFilter={setPlayerIdsFilter}
        teams={teams}
        teamsIsLoading={teamsIsLoading}
        teamsError={teamsError}
      />
      <TableWithPagination
        data={players}
        cols={cols}
        isLoading={isLoading}
        error={error}
        refetch={refetch}
        currentPage={currentPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        fetchNextPage={fetchNextPage}
        fetchPreviousPage={fetchPreviousPage}
        onRowClicked={onRowClicked}
        showPinnedTopRow
      />
    </Stack>
  );
};

export default Players;
