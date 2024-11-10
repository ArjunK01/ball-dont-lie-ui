import { useMemo } from "react";
import { PlayersApiResponse } from "../types/api-types";
import { PLAYERS_API_URL, makeAuthedRequest } from "../constants/api";
import useCursor from "./useCursor";

import useQueryStateParam from "./useQueryStateParam";

const fetcher = async (key: { url: string; params: any }) => {
  return makeAuthedRequest<PlayersApiResponse>(key.url, key.params);
};

const usePlayers = () => {
  const [search, setSearch] = useQueryStateParam({
    key: "search",
    defaultValue: "",
  });

  const [firstNameFilter, setFirstNameFilter] = useQueryStateParam<string>({
    key: "first_name",
    defaultValue: "",
  });

  const [lastNameFilter, setLastNameFilter] = useQueryStateParam<string>({
    key: "last_name",
    defaultValue: "",
  });

  const [teamIdsFilter, setTeamIdsFilter] = useQueryStateParam<number[]>({
    key: "team_ids",
    defaultValue: [],
  });

  const [playerIdsFilter, setPlayerIdsFilter] = useQueryStateParam<number[]>({
    key: "player_ids",
    defaultValue: [],
  });

  let filterParams = useMemo(() => {
    return {
      first_name: firstNameFilter,
      last_name: lastNameFilter,
      team_ids: teamIdsFilter,
      player_ids: playerIdsFilter,
      search,
    };
  }, [firstNameFilter, lastNameFilter, teamIdsFilter, playerIdsFilter, search]);

  const {
    data,
    error,
    isLoading,
    refetch,
    fetchNextPage,
    fetchPreviousPage,

    pageSize,
    currentPage,
    setPageSize,
  } = useCursor({
    url: PLAYERS_API_URL,
    filterParams,
    fetcher,
  });

  const players = data?.data ?? [];

  return {
    players,
    isLoading,
    error,
    currentPage,
    pageSize,
    setPageSize,
    fetchNextPage,
    fetchPreviousPage,
    search,
    setSearch,
    refetch,
    firstNameFilter,
    setFirstNameFilter,
    lastNameFilter,
    setLastNameFilter,
    teamIdsFilter,
    setTeamIdsFilter,
    playerIdsFilter,
    setPlayerIdsFilter,
  };
};

export default usePlayers;
