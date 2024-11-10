import { Player } from "./player-type";
import { Stat } from "./stats-type";
import { Team } from "./team-type";

type Meta = {
  next_cursor?: number;
  per_page: number;
  prev_cursor?: number;
};

export type PlayersApiRequestParams = {
  cursor?: number;
  per_page?: number;
  search?: string;
  first_name?: string;
  last_name?: string;
  team_ids?: number[];
  player_ids?: number[];
};

export type PlayersApiResponse = {
  data: Player[];
  meta: Meta;
};

export type TeamsApiResponse = {
  data: Team[];
};

export type PlayerApiResponse = {
  data: Player;
};

export type StatsApiRequestParams = {
  cursor?: number;
  per_page?: number;
  player_ids?: number[];
  game_ids?: number[];
  dates?: string[];
  seasons?: number[];
  postseason?: boolean;
  start_date?: string;
  end_date?: string;
};

export type StatsApiResponse = {
  data: Stat[];
  meta: Meta;
};
