import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Nav from "./components/nav/Nav";
import { Box } from "@mui/material";
import { backgroundColor } from "./constants/colors";
import Landing from "./pages/Landing";
import Players from "./pages/Players";
import Player from "./pages/Player";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Box
        sx={{
          flex: 1,

          display: "flex",
          flexDirection: "column",
        }}
      >
        <Nav />
        <Outlet />
      </Box>
    ),
    children: [
      {
        path: "",
        element: <Landing />,
      },
      {
        path: "players",
        element: <Players />,
      },
      {
        path: "players/:id",
        element: <Player />,
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <Box
      sx={{
        backgroundColor,
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
      }}
    >
      <Box
        sx={{
          maxWidth: (theme) => theme.breakpoints.values.lg,
          margin: "0 auto",
          px: {
            xs: 1,
            lg: 0,
          },
          pb: 4,
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <RouterProvider router={router} />
      </Box>
    </Box>
  </React.StrictMode>
);
