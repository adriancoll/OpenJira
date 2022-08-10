import { useContext } from "react";

import { MenuOutlined } from "@mui/icons-material";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";

import { UIContext } from "../../context/ui";

export const Navbar = () => {
  const { toggleSideMenu } = useContext(UIContext)

  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton onClick={toggleSideMenu} size="large" edge="start">
          <MenuOutlined />

        </IconButton>

        {/* Navigate home */}
        <Typography variant="h6">OpenJira</Typography>
      </Toolbar>
    </AppBar>
  );
};
