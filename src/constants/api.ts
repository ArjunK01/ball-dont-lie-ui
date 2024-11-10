import axios from "axios";
import { PlayersApiRequestParams } from "../types/api-types";

// Clearly unsecure in a normal setting, but I'm keeping it client side for simplicity vs setting up a server
export const API_KEY = process.env.REACT_APP_API_KEY;

export const PLAYERS_API_URL = "https://api.balldontlie.io/v1/players";
export const TEAMS_API_URL = "https://api.balldontlie.io/v1/teams";
export const STATS_API_URL = "https://api.balldontlie.io/v1/stats";
export const makeAuthedRequest = async <T>(
  url: string,
  params: PlayersApiRequestParams
) => {
  const response = await axios.get<T>(url, {
    headers: {
      Authorization: API_KEY,
    },
    params,
  });

  return response.data;
};
