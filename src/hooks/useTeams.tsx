import { TeamsApiResponse } from "../types/api-types";
import { TEAMS_API_URL, makeAuthedRequest } from "../constants/api";
import useSWR from "swr";

const fetcher = async (url: string) => {
  return makeAuthedRequest<TeamsApiResponse>(url, {});
};

const useTeams = () => {
  const { data, error, isLoading } = useSWR(TEAMS_API_URL, fetcher);

  const teams = data?.data ?? [];

  return {
    teams,
    error,
    isLoading,
  };
};

export default useTeams;
