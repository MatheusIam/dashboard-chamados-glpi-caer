"use client";
import TicketTable from "@/components/tabelachamados";
import { Box } from "@mui/material";
import Container from "@mui/material/Container";
const Home = () => {
  return (
    <Container maxWidth="xl">
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1, marginRight: "16px" }}>mapa</div>
        <div style={{ flex: 1 }}>
          <TicketTable />
        </div>
      </div>
    </Container>
  );
};

export default Home;
