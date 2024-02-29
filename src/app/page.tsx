import { Box, Grid, Typography } from "@mui/material";
import TabelaChamadosV2 from "@/components/v2/fetchTickets";

import RankingGraph from "@/components/v2/rankingGraph";
const Home = () => {
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TabelaChamadosV2 />
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box width={"100%"} height={"50vh"}>
              <RankingGraph />
            </Box>
            <Box
              sx={{
                height: "48vh",
                width: "98%",
                backgroundColor: "red",
                marginLeft: 2,
              }}
            >
              <Typography variant="h3" color="initial">
                Fila de atendimento
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
