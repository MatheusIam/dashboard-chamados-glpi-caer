"use client";
import TicketTable from "@/components/tabelachamados";
import { Box, Typography } from "@mui/material";
import Container from "@mui/material/Container";
const Home = () => {
  return (
    <Container maxWidth="xl">
      <div style={{ display: "flex" }}>
        <div
          style={{
            flex: 1,
            marginRight: "16px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div>
            <Typography> ranking </Typography>
          </div>
          <div>
            <Typography> fila de atendimento </Typography>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <TicketTable />
        </div>
      </div>
    </Container>
  );
};

export default Home;
