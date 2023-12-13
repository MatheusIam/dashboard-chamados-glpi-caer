import { Box, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts";

const RankingChartComponent = () => {
  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Typography>Ranking de chamados</Typography>
      <BarChart
        xAxis={[
          {
            id: "barCategories",
            data: ["bar A", "bar B", "bar C"],
            scaleType: "band",
          },
        ]}
        series={[
          {
            data: [2, 5, 3],
          },
        ]}
        width={500}
        height={300}
      />
    </Box>
  );
};

export default RankingChartComponent;
