import { useParams } from "react-router-dom";
import { makeAuthedRequest, PLAYERS_API_URL } from "../constants/api";
import { PlayerApiResponse } from "../types/api-types";
import { Player as PlayerType } from "../types/player-type";
import useSWR from "swr";
import { Breadcrumbs, Link, Stack, Typography } from "@mui/material";
import Stats from "../components/player/Stats";

const fetcher = (key: { url: string; params: any }) => {
  return makeAuthedRequest<PlayerApiResponse>(key.url, key.params);
};

const playerFieldToLabel = {
  first_name: "First Name",
  last_name: "Last Name",
  position: "Position",
  height: "Height",
  weight: "Weight",
  jersey_number: "Jersey Number",
  college: "College",
  country: "Country",
  draft_year: "Draft Year",
  draft_round: "Draft Round",
  draft_number: "Draft Number",
};

const Player = () => {
  const { id } = useParams();

  const {
    data: playerData,
    error: playerError,
    isLoading: playerIsLoading,
  } = useSWR(
    id ? { url: `${PLAYERS_API_URL}/${id}`, params: {} } : null,
    fetcher
  );

  const player = playerData?.data;

  let parsedId = parseInt(id || "");

  if (!parsedId) {
    return <Typography>Player ID not found</Typography>;
  }

  if (playerError) {
    return (
      <Container>
        <Typography>Error: {playerError.message}</Typography>
      </Container>
    );
  }

  if (playerIsLoading) {
    return (
      <Container>
        <Typography>Loading Player...</Typography>
      </Container>
    );
  }

  if (!player) {
    return (
      <Container>
        <Typography>Player not found</Typography>
      </Container>
    );
  }

  let specs = Object.entries(playerFieldToLabel).map(([field, label]) => ({
    label,
    value: player[field as keyof PlayerType],
  }));

  if (player.team) {
    specs.push({ label: "Team", value: player.team.full_name });
  }

  return (
    <Container>
      <Stack gap={5} direction="row" flexWrap="wrap">
        {specs.map(({ label, value }) => (
          <PlayerField key={label} label={label} value={value} />
        ))}
      </Stack>
      <Stats id={parsedId} />
    </Container>
  );
};

export default Player;

const PlayerField = ({ label, value }: { label: string; value: any }) => {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  return (
    <Stack>
      <Typography sx={{ color: "text.secondary", fontSize: 14 }}>
        {label}
      </Typography>
      <Typography>{value}</Typography>
    </Stack>
  );
};

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <Stack gap={3} sx={{ flexGrow: 1 }}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/players/">
          Players
        </Link>
        <Typography sx={{ color: "text.primary" }}>Player</Typography>
      </Breadcrumbs>
      {children}
    </Stack>
  );
};
