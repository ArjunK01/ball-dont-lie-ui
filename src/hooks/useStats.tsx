import { useMemo } from "react";
import { makeAuthedRequest, STATS_API_URL } from "../constants/api";
import { StatsApiResponse } from "../types/api-types";
import useQueryStateParam from "./useQueryStateParam";
import useCursor from "./useCursor";

const fetcher = (key: { url: string; params: any }) => {
  return makeAuthedRequest<StatsApiResponse>(key.url, key.params);
};

const useStats = (id: number) => {
  const [selectedSeason, setSelectedSeason] = useQueryStateParam({
    key: "season",
    defaultValue: 2024,
  });

  const filterParams = useMemo(() => {
    return {
      player_ids: [id],
      seasons: [selectedSeason],
    };
  }, [id, selectedSeason]);

  const {
    data,
    error,
    isLoading,
    refetch,
    currentPage,
    pageSize,
    setPageSize,
    fetchNextPage,
    fetchPreviousPage,
  } = useCursor({
    url: STATS_API_URL,
    filterParams,
    fetcher,
  });

  return {
    stats: data?.data ?? [],
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
  };
};

export default useStats;
