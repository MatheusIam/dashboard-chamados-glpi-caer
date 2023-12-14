import { Box, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts";

const RankingChartComponent = () => {
  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Typography>Ranking de Atendimentos do Mês</Typography>
      <BarChart
        xAxis={[
          {
            id: "barCategories",
            data: ["Matheus", "Vinicius", "Estevam"],
            scaleType: "band",
          },
        ]}
        series={[
          {
            data: [200, 54, 45],
          },
        ]}
        width={500}
        height={300}
      />
    </Box>
  );
};

export default RankingChartComponent;
