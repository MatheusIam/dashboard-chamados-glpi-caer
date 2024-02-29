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
          <Box height={["@media (min-width: 3000px)"] ? 50 : 300} />
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontSize: 16,
              ["@media (min-width: 3000px)"]: {
                // Media query simplificada
                fontSize: 16 * 3,
              },
              fontWeight: "bold",
            }}
          >
            CHAMADOS DO GLPI
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
