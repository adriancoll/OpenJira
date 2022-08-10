import { MenuOutlined } from "@mui/icons-material";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";

export const Navbar = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton size="large" edge="start">
          <MenuOutlined />
          
        </IconButton>

        {/* Navigate home */}
        <Typography variant="h6">OpenJira</Typography>
      </Toolbar>
    </AppBar>
  );
};
