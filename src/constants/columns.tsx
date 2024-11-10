import { ColDef, ICellRendererParams } from "ag-grid-community";
import { Player } from "../types/player-type";
import DebouncedInput from "../components/core/DebouncedInput";
import { Stat } from "../types/stats-type";
export const getColDefs = (
  firstNameInput: string,
  setFirstNameInput: (firstNameInput: string) => void,
  lastNameInput: string,
  setLastNameInput: (lastNameInput: string) => void
): ColDef<Player>[] => [
  {
    headerName: "First Name",
    field: "first_name",
    cellRendererSelector: (params: ICellRendererParams<Player>) => {
      if (params.node.rowPinned) {
        return {
          component: DebouncedInput,
          params: {
            value: firstNameInput,
            onChange: (value: string) => setFirstNameInput(value),
            placeholder: "Lebron",
          },
        };
      }
      return undefined;
    },
  },
  {
    headerName: "Last Name",
    field: "last_name",
    cellRendererSelector: (params: ICellRendererParams<Player>) => {
      if (params.node.rowPinned) {
        return {
          component: DebouncedInput,
          params: {
            value: lastNameInput,
            onChange: (value: string) => setLastNameInput(value),
            placeholder: "James",
          },
        };
      }
      return undefined;
    },
  },
  {
    headerName: "Position",
    field: "position",
  },
  {
    headerName: "Height",
    field: "height",
  },
  {
    headerName: "Weight",
    field: "weight",
  },
  {
    headerName: "Jersey Number",
    field: "jersey_number",
  },
  {
    headerName: "College",
    field: "college",
  },
  {
    headerName: "Country",
    field: "country",
  },
  {
    headerName: "Draft Year",
    field: "draft_year",
  },
  {
    headerName: "Draft Round",
    field: "draft_round",
  },
  {
    headerName: "Draft Number",
    field: "draft_number",
  },
  {
    headerName: "Team",
    valueGetter: (params) => params.data?.team?.abbreviation,
  },
];

export const statColDefs: ColDef<Stat>[] = [
  {
    headerName: "Date",
    valueGetter: (params) => params.data?.game?.date,
  },
  {
    headerName: "Season",
    valueGetter: (params) => params.data?.game?.season,
  },
  {
    headerName: "Min",
    valueGetter: (params) => params.data?.min,
  },
  {
    headerName: "FGM",
    valueGetter: (params) => params.data?.fgm,
  },
  {
    headerName: "FGA",
    valueGetter: (params) => params.data?.fga,
  },
  {
    headerName: "FG%",
    valueGetter: (params) => params.data?.fg_pct,
  },
  {
    headerName: "3PM",
    valueGetter: (params) => params.data?.fg3m,
  },
  {
    headerName: "3PA",
    valueGetter: (params) => params.data?.fg3a,
  },
  {
    headerName: "3P%",
    valueGetter: (params) => params.data?.fg3_pct,
  },
  {
    headerName: "FTM",
    valueGetter: (params) => params.data?.ftm,
  },
  {
    headerName: "FTA",
    valueGetter: (params) => params.data?.fta,
  },
  {
    headerName: "FT%",
    valueGetter: (params) => params.data?.ft_pct,
  },
  {
    headerName: "OREB",
    valueGetter: (params) => params.data?.oreb,
  },
  {
    headerName: "DREB",
    valueGetter: (params) => params.data?.dreb,
  },
  {
    headerName: "REB",
    valueGetter: (params) => params.data?.reb,
  },
  {
    headerName: "AST",
    valueGetter: (params) => params.data?.ast,
  },
  {
    headerName: "STL",
    valueGetter: (params) => params.data?.stl,
  },
  {
    headerName: "BLK",
    valueGetter: (params) => params.data?.blk,
  },
  {
    headerName: "TO",
    valueGetter: (params) => params.data?.turnover,
  },
  {
    headerName: "PF",
    valueGetter: (params) => params.data?.pf,
  },
  {
    headerName: "PTS",
    valueGetter: (params) => params.data?.pts,
  },
];
