"use client";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
} from "@mui/material";

const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            CHAMADOS DO GLPI{" "}
          </Typography>
          <Button color="inherit" href="/">
            Dashboard
          </Button>
          <Button color="inherit" href="/ranking">
            Ranking
          </Button>
          <Button color="inherit" href="/rede">
            Rede
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
