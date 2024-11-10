import { Box, Button, Stack, Typography } from "@mui/material";
import NavigationLink from "../components/core/NavigationLink";
const Landing = () => {
  return (
    <Box sx={{ mt: 4, width: "100%" }}>
      <Stack
        sx={{ mx: "auto", width: "fit-content" }}
        alignItems="center"
        spacing={2}
      >
        <Typography variant="h4">Welcome to BallDontLie UI</Typography>
        <NavigationLink to="/players">
          <Button variant="contained" sx={{ width: "fit-content" }}>
            Get Started
          </Button>
        </NavigationLink>
      </Stack>
    </Box>
  );
};

export default Landing;
