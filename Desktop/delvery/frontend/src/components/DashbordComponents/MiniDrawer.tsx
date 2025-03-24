// import React from "react";
// import { Box, CssBaseline } from "@mui/material";
// import TopBar from "./TopBar";
// import SideBar from "./SideBar";

// const MiniDrawer: React.FC = () => {
//   const [open, setOpen] = React.useState(false);

//   const handleDrawerOpen = () => {
//     setOpen(true);
//   };

//   const handleDrawerClose = () => {
//     setOpen(false);
//   };

//   return (
//     <Box sx={{ display: "flex" }}>
//       <CssBaseline />
//       <TopBar open={open} handleDrawerOpen={handleDrawerOpen} />
//       <SideBar open={open} handleDrawerClose={handleDrawerClose} />
//       <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//         <div style={{ marginTop: "64px" }} />
//         {/* Le contenu des pages enfants sera injecté ici via Outlet */}
//       </Box>
//     </Box>
//   );
// };

// export default MiniDrawer;

import React from "react";
import { Box, CssBaseline } from "@mui/material";
import TopBar from "./TopBar";
import SideBar from "./SideBar";


const MiniDrawer: React.FC = () => {
   // Utilisez DashboardContext

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <TopBar />
      <SideBar />
  
    </Box>
  );
};

export default MiniDrawer;
