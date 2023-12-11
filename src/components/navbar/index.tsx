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
            Mapa de chamados
          </Typography>
          <Button color="inherit">Dashboard</Button>
          <Button color="inherit">Ranking</Button>
          <Button color="inherit">Rede</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
