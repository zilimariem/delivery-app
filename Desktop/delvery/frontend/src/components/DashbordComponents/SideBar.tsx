// import React from "react";
// import {
//   Drawer,
//   List,
//   Divider,
//   ListItem,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   IconButton,
// } from "@mui/material";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import InboxIcon from "@mui/icons-material/MoveToInbox";
// import MailIcon from "@mui/icons-material/Mail";
// import { styled, useTheme } from "@mui/material/styles";

// interface SideBarProps {
//   open: boolean;
//   handleDrawerClose: () => void;
// }

// const DrawerHeader = styled("div")(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "flex-end",
//   padding: theme.spacing(0, 1),
//   ...theme.mixins.toolbar,
// }));

// const SideBar: React.FC<SideBarProps> = ({ open, handleDrawerClose }) => {
//   const theme = useTheme();

//   return (
//     <Drawer variant="permanent" open={open}>
//       <DrawerHeader>
//         <IconButton onClick={handleDrawerClose}>
//           {theme.direction === "rtl" ? (
//             <ChevronRightIcon />
//           ) : (
//             <ChevronLeftIcon />
//           )}
//         </IconButton>
//       </DrawerHeader>
//       <Divider />

//       <List>
//         {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
//           <ListItem key={text} disablePadding sx={{ display: "block" }}>
//             <ListItemButton
//               sx={{
//                 minHeight: 48,
//                 justifyContent: open ? "initial" : "center",
//                 px: 2.5,
//               }}
//             >
//               <ListItemIcon
//                 sx={{
//                   minWidth: 0,
//                   mr: open ? 3 : "auto",
//                   justifyContent: "center",
//                 }}
//               >
//                 {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//               </ListItemIcon>
//               <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>

//       <Divider />

//     </Drawer>
//   );
// };

// export default SideBar;

import React from "react";
import {
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import {
  DashboardOutlined,
  PeopleOutline,
  LocalShippingOutlined,
  StorefrontOutlined,
  AssignmentOutlined,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const SideBar: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const menuItems = [
    { text: "Dashboard", icon: <DashboardOutlined />, path: "/dashboard" },
    { text: "Clients", icon: <PeopleOutline />, path: "/dashboard/clients" },
    {
      text: "Livreurs",
      icon: <LocalShippingOutlined />,
      path: "/dashboard/livreurs",
    },
    {
      text: "Partenaires",
      icon: <StorefrontOutlined />,
      path: "/dashboard/partenaires",
    },
    {
      text: "Demandes",
      icon: <AssignmentOutlined />,
      path: "/dashboard/demandes",
    },
  ];

  return (
    <Drawer
      variant="permanent"
      open={true}
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          backgroundColor: theme.palette.background.paper,
        },
      }}
    >
      <DrawerHeader>{/* Supprimer le bouton de fermeture */}</DrawerHeader>

      <Divider />
      <Typography align="center" sx={{ fontSize: 17, transition: "all 0.25s" }}>
        Mariem
      </Typography>
      <Typography
        align="center"
        sx={{
          fontSize: 15,
          transition: "all 0.25s",
          color: theme.palette.info.main,
        }}
      >
        Admin
      </Typography>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              onClick={() => navigate(item.path)}
              sx={{
                minHeight: 48,
                justifyContent: "flex-start",
                px: 3,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: 3,
                  justifyContent: "center",
                  color: theme.palette.text.primary,
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{ opacity: 1, color: theme.palette.text.primary }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Drawer>
  );
};

export default SideBar;