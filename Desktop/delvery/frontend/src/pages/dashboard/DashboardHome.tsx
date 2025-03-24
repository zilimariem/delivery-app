import { Box } from "@mui/material";
import MiniDrawer from "../../components/DashbordComponents/MiniDrawer";
import { DashboardProvider } from "../../context/DashboardContext";
import { Outlet } from "react-router-dom";
import { useThemeContext } from "../../theme/themeCotext"; // Use the correct hook
import { lightTheme, darkTheme } from "../../theme/theme";
const DashboardHome = () => {
  const { darkMode } = useThemeContext(); // Use the theme context

  // Determine the theme based on darkMode
  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <DashboardProvider>
      <MiniDrawer />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginTop: "52px",
          backgroundColor: theme.palette.background.default, // Apply the theme
          color: theme.palette.text.primary, // Apply the theme
        }}
      >
        <Outlet /> {/* Display child route content */}
      </Box>
    </DashboardProvider>
  );
};

export default DashboardHome;
