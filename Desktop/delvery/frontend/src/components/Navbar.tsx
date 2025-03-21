import { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  TextField,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  InputAdornment,
  Grid,
  ListItemButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const isMobile = useMediaQuery("(max-width: 600px)");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/");
  };

  // Fonction pour ouvrir/fermer le Drawer (menu mobile)
  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        "key" in event &&
        (event.key === "Tab" || event.key === "Shift")
      ) {
        return;
      }
      setDrawerOpen(open);
    };

  // Contenu du Drawer (menu mobile)
  const drawerContent = (
    <List>
      <ListItem disablePadding>
        <ListItemButton component={Link} to="/" onClick={toggleDrawer(false)}>
          <ListItemText primary="Home" />
        </ListItemButton>
      </ListItem>

      <ListItem disablePadding>
        <ListItemButton
          component={Link}
          to="/partners"
          onClick={toggleDrawer(false)}
        >
          <ListItemText primary="Partners" />
        </ListItemButton>
      </ListItem>

      <ListItem disablePadding>
        <ListItemButton
          component={Link}
          to="/livraison-personnalisee"
          onClick={toggleDrawer(false)}
        >
          <ListItemText primary="Livraison Personnalisée" />
        </ListItemButton>
      </ListItem>

      {isAuthenticated ? (
        <>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/profile"
              onClick={toggleDrawer(false)}
            >
              <ListItemText primary="Profile" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </>
      ) : (
        <>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/register"
              onClick={toggleDrawer(false)}
            >
              <ListItemText primary="Register" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/login"
              onClick={toggleDrawer(false)}
            >
              <ListItemText primary="Login" />
            </ListItemButton>
          </ListItem>
        </>
      )}
    </List>
  );

  return (
    <AppBar position="static" sx={{ backgroundColor: "primary.main" }}>
      <Toolbar>
        <Grid container spacing={2} alignItems="center">
          {/* Logo */}
          <Grid item xs={6} md={2}>
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{ textDecoration: "none", color: "inherit" }}
            >
              Delivery App
            </Typography>
          </Grid>

          {/* Version Desktop */}
          {!isMobile && (
            <>
              {/* Navigation Links */}
              <Grid item md={6} sx={{ display: "flex", gap: 2 }}>
                <Button color="inherit" component={Link} to="/">
                  Home
                </Button>
                <Button color="inherit" component={Link} to="/partners">
                  Partners
                </Button>
                <Button
                  color="inherit"
                  component={Link}
                  to="/livraison-personnalisee"
                >
                  Livraison Personnalisée
                </Button>
              </Grid>

              {/* Search Bar */}
              <Grid item md={2}>
                <TextField
                  variant="outlined"
                  size="small"
                  placeholder="Search..."
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ backgroundColor: "background.paper", borderRadius: 1 }}
                />
              </Grid>

              {/* Register/Login or Profile/Logout Buttons */}
              <Grid item md={2} sx={{ display: "flex", gap: 2 }}>
                {isAuthenticated ? (
                  <>
                    <Button color="inherit" component={Link} to="/profile">
                      Profile
                    </Button>
                    <Button color="inherit" onClick={handleLogout}>
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button color="inherit" component={Link} to="/register">
                      Register
                    </Button>
                    <Button color="inherit" component={Link} to="/login">
                      Login
                    </Button>
                  </>
                )}
              </Grid>
            </>
          )}

          {/* Version Mobile */}
          {isMobile && (
            <Grid
              item
              xs={6}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              {/* Menu Hamburger */}
              <IconButton color="inherit" onClick={toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>

              {/* Drawer (Menu Mobile) */}
              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
              >
                {drawerContent}
              </Drawer>
            </Grid>
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
