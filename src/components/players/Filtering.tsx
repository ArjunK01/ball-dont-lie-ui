import { Chip, TextField } from "@mui/material";
import { AddCircleRounded, ClearRounded } from "@mui/icons-material";
import {
  IconButton,
  Stack,
  Select,
  MenuItem,
  ListItemText,
  Checkbox,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useState } from "react";
import { Team } from "../../types/team-type";
import DebouncedInput from "../core/DebouncedInput";

interface FilteringProps {
  search: string;
  setSearch: (search: string) => void;
  teamIdsFilter: number[];
  setTeamIdsFilter: (teamIdsFilter: number[]) => void;
  playerIdsFilter: number[];
  setPlayerIdsFilter: (playerIdsFilter: number[]) => void;
  teams: Team[];
  teamsIsLoading: boolean;
  teamsError: Error | undefined;
}

const Filtering = ({
  search,
  setSearch,
  teamIdsFilter,
  setTeamIdsFilter,
  playerIdsFilter,
  setPlayerIdsFilter,
  teams,
  teamsIsLoading,
  teamsError,
}: FilteringProps) => {
  const [localPlayerIdsFilter, setLocalPlayerIdsFilter] = useState("");

  return (
    <Stack gap={1}>
      <Stack
        direction="row"
        justifyContent="space-between"
        gap={1}
        flexWrap="wrap"
        alignItems="baseline"
      >
        <Stack direction="row" gap={3} flexWrap="wrap">
          <Stack direction="row" gap={1} alignItems="center">
            <FormControl sx={{ width: 200 }}>
              <InputLabel id="teams-select-label">Teams</InputLabel>
              <Select
                labelId="teams-select-label"
                id="teams-select"
                multiple
                value={teamIdsFilter}
                onChange={(e) => setTeamIdsFilter(e.target.value as number[])}
                renderValue={(selected) =>
                  selected
                    .map((id) => teams.find((t) => t.id === id)?.full_name)
                    .filter(Boolean)
                    .join(", ")
                }
                disabled={teamsIsLoading || !!teamsError}
                label="Teams"
              >
                {teams.map((team) => (
                  <MenuItem key={team.id} value={team.id}>
                    <Checkbox checked={teamIdsFilter.includes(team.id)} />
                    <ListItemText primary={team.full_name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {teamIdsFilter.length > 0 && (
              <IconButton
                onClick={() => {
                  setTeamIdsFilter([]);
                }}
              >
                <ClearRounded />
              </IconButton>
            )}
          </Stack>

          <Stack direction="row" gap={1} alignItems="center" flexWrap="wrap">
            <TextField
              type="number"
              variant="standard"
              value={localPlayerIdsFilter}
              onChange={(e) => setLocalPlayerIdsFilter(e.target.value)}
              placeholder="Player ID"
            />
            <IconButton
              onClick={() => {
                let parsedValue = Number(localPlayerIdsFilter);
                if (parsedValue) {
                  setLocalPlayerIdsFilter("");
                  setPlayerIdsFilter(
                    Array.from(new Set([...playerIdsFilter, parsedValue]))
                  );
                }
              }}
            >
              <AddCircleRounded />
            </IconButton>

            {playerIdsFilter.map((id) => {
              return (
                <Chip
                  key={id}
                  label={id.toString()}
                  size="small"
                  onDelete={() =>
                    setPlayerIdsFilter(playerIdsFilter.filter((i) => i !== id))
                  }
                />
              );
            })}
          </Stack>
        </Stack>

        <DebouncedInput
          value={search}
          onChange={(value) => setSearch(value)}
          placeholder={"Search players..."}
          sx={{
            width: "fit-content",
          }}
        />
      </Stack>
    </Stack>
  );
};

export default Filtering;
