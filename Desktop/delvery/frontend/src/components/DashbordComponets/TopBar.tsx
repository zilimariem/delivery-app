"use client";

import type React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  InputBase,
  Box,
  useTheme,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SearchIcon from "@mui/icons-material/Search";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import NightlightOutlinedIcon from "@mui/icons-material/NightlightOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import { useAppDarkMode } from "../../App";

interface TopBarProps {
  open: boolean;
  handleDrawerOpen: () => void;
}

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const TopBar: React.FC<TopBarProps> = ({ open, handleDrawerOpen }) => {
  const { darkMode, toggleDarkMode } = useAppDarkMode();
  const theme = useTheme();

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ marginRight: 5, ...(open && { display: "none" }) }}
        >
          {open ? (
            theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )
          ) : (
            <MenuIcon />
          )}
        </IconButton>
        <Typography variant="h6" noWrap>
          Mini variant drawer
        </Typography>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
        <Box flexGrow={1} />
        <IconButton
          color="inherit"
          onClick={toggleDarkMode}
          sx={{
            transition: "transform 0.3s ease-in-out",
            "&:hover": { transform: "rotate(30deg)" },
          }}
        >
          {darkMode ? <NightlightOutlinedIcon /> : <LightModeOutlinedIcon />}
        </IconButton>
        <IconButton color="inherit">
          <NotificationsNoneOutlinedIcon />
        </IconButton>
        <IconButton color="inherit">
          <Person2OutlinedIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
