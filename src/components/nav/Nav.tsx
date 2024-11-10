import { Button, Stack, Typography } from "@mui/material";
import NavigationLink from "../core/NavigationLink";

const Nav = () => {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ py: 2 }}
    >
      <NavigationLink to="/">
        <Typography
          variant="h6"
          sx={{ textDecoration: "none", color: "black", underline: "none" }}
        >
          BallDontLie UI
        </Typography>
      </NavigationLink>
      <NavigationLink to="/players">
        <Button variant="outlined">Players</Button>
      </NavigationLink>
    </Stack>
  );
};

export default Nav;
