import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu"; 
import HomeIcon from "@mui/icons-material/Home";
import AirportIcon from "@mui/icons-material/ConnectingAirports";
import FlightIcon from "@mui/icons-material/AirplaneTicket";
import AirplaneIcon from "@mui/icons-material/Flight";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const menuItems = [
    { text: "Home", icon: <HomeIcon />, path: "/" },
    { text: "Airports", icon: <AirportIcon />, path: "/airports" },
    { text: "Flights", icon: <FlightIcon />, path: "/flights" },
    { text: "Planes", icon: <AirplaneIcon />, path: "/planes" }
  ];

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton component={Link} to={item.path}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      {/* Hamburger Icon */}
      <IconButton
        color="inherit"
        edge="start"
        onClick={toggleDrawer(true)}
        aria-label="menu"
      >
        <MenuIcon />
      </IconButton>

      {/* Drawer */}
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
