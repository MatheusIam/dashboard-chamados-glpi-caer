"use client";
import RankingChartComponent from "@/components/ranking";
import MaisQueridosChartComponent from "@/components/ranking/maisQueridos";
import TicketTable from "@/components/tabelachamados";
import { Box, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import zIndex from "@mui/material/styles/zIndex";
const Home = () => {
  return (
    <Container maxWidth={false}>
      <div style={{ display: "flex" }}>
        <div
          style={{
            flex: 2,
            marginRight: "16px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div>
            <RankingChartComponent />
          </div>
          <div>
            <Box sx={{ width: "100%", height: "100%" }}>
              <Typography variant="h4">Mais Queridos da Semana❤️</Typography>
              <MaisQueridosChartComponent />
            </Box>
          </div>
        </div>
        <div style={{ flex: 3 }}>
          <TicketTable />
        </div>
      </div>
    </Container>
  );
};

export default Home;
